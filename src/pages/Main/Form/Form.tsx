import React, {
  FormEvent,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import Loading from "../../../components/Loading/Loading";
import SubjectToggle from "../../../components/Forms/SubjectToggle";
import Modal from "../Form/Modal/Modal";
import "./Form.scss";
import { useNavigate } from "react-router-dom";

/**
 * Main component로 부터 받아온 Props 입니다.
 */
interface Props {
  setShowResult: Dispatch<SetStateAction<boolean>>;
  setResult: Dispatch<
    SetStateAction<{
      예측결과: number;
      진단결과: { college: string; college_percentage: number; major: string };
      피드백: string;
    }>
  >;
  result: {
    예측결과: number;
    진단결과: { college: string; college_percentage: number; major: string };
    피드백: string;
  };
}

interface CollegeObject {
  admissionType: string;
  avgGpa: number;
  campus: string;
  college: string;
  id: number;
  major: string;
  maxGpa: number;
  medGpa: number;
  minGpa: number;
  stdevGpa: number;
  year: number;
}

type uniList = string[];

function Form({ setShowResult, setResult }: Props) {
  /**
   * isSubject는 학생의 합격률 조회 종목을 교과인지 종합인지 판단하는 기준이되는 State입니다
   * uniList는 서버에서 대학교의 리스트를 받아와서 저장하는 State입니다.
   * majorList는 학생이 선택한 대학교, 종목을 기준으로 필터링된 학과리스트를 저장하는 State입니다
   * isLoading은 Submit버튼 클릭후 서버에서 데이터를 받아오는 동안 Loading 컴포넌트를 렌더링하는 기준이되는 State입니다
   * isOpenModal은 정보입력페이지의 내신성적 입력하기 모달 Display [none, flex]를 결정짓는 State입니다.
   * testScore는 1학년 1학기부터 3학년 2학기까지 총 6개의 탭에서 국,영,수,사,과 5개의 과목의 단위,성적 2개의 데이터를 받아오는
   * 총 60개의 InputValue를 저장하는 States 입니다.
   */
  const [isSubject, setIsSubject] = useState(true);
  const [uniList, setUniList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [testScore1, setTestScore1] = useState({
    국U: "",
    국S: "",
    수U: "",
    수S: "",
    영U: "",
    영S: "",
    사U: "",
    사S: "",
    과U: "",
    과S: "",
  });
  const [testScore2, setTestScore2] = useState({
    국U: "",
    국S: "",
    수U: "",
    수S: "",
    영U: "",
    영S: "",
    사U: "",
    사S: "",
    과U: "",
    과S: "",
  });
  const [testScore3, setTestScore3] = useState({
    국U: "",
    국S: "",
    수U: "",
    수S: "",
    영U: "",
    영S: "",
    사U: "",
    사S: "",
    과U: "",
    과S: "",
  });
  const [testScore4, setTestScore4] = useState({
    국U: "",
    국S: "",
    수U: "",
    수S: "",
    영U: "",
    영S: "",
    사U: "",
    사S: "",
    과U: "",
    과S: "",
  });
  const [testScore5, setTestScore5] = useState({
    국U: "",
    국S: "",
    수U: "",
    수S: "",
    영U: "",
    영S: "",
    사U: "",
    사S: "",
    과U: "",
    과S: "",
  });
  const [testScore6, setTestScore6] = useState({
    국U: "",
    국S: "",
    수U: "",
    수S: "",
    영U: "",
    영S: "",
    사U: "",
    사S: "",
    과U: "",
    과S: "",
  });
  const navigate = useNavigate();

  const url = "http://43.201.70.179:8000";
  const accentColor = `lightgreen`;

  useEffect(() => {
    loadUniversityList();
  }, []);

  async function loadUniversityList() {
    const res = await fetch(`${url}/selT/college-event`);
    const data = await res.json();
    const test = data.reduce((acc: uniList, cur: CollegeObject) => {
      if (!acc.includes(cur.college)) {
        return [...acc, cur.college];
      }
      return acc;
    }, []);
    setUniList(test);
  }

  const loadMajor = (uni: any) => {
    fetch(
      `${url}/selT/college-event?college=${uni}&admission_type=${
        isSubject ? "교과" : "종합"
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setMajorList(
          data
            .filter((el: any) => el.college === uni)
            .map((el: any) => el.major)
        );
      });
  };

  interface infoI {
    name: "뚱이";
    email: "pmb087@gmail.com";
    is_male: true;
    admission_type: string;
    avg_gpa: number;
    college: {
      college: string;
      major: string;
    };
  }

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { avgGpa, college, major } = e.target as typeof e.target & {
      avgGpa: { value: number };
      college: { value: string };
      major: { value: string };
    };

    let data: infoI = {
      name: "뚱이",
      email: "pmb087@gmail.com",
      is_male: true,
      admission_type: isSubject ? "교과" : "종합",
      avg_gpa: Number(avgGpa.value),
      college: {
        college: college.value,
        major: major.value,
      },
    };

    const requestOptions: any = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${url}/selT/college-prediction`, requestOptions)
      .then((response) =>
        response.status >= 400 ? navigate("/exception") : response.json()
      )
      .then((data) => {
        setResult(data);

        setShowResult(true);
      });
  }

  const onClickToggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const style = {
    "& label.Mui-focused": {
      color: "#26A58A",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: accentColor,
      },
    },
  };

  return (
    <div className="form">
      <form
        className="formWrap"
        onSubmit={(e) => {
          submitForm(e);
          setIsLoading(true);
        }}
      >
        <div className="inputWrap">
          <SubjectToggle setIsSubject={setIsSubject} isSubject={isSubject} />

          <button
            className="dialogButton"
            onClick={(e) => {
              onClickToggleModal();
              e.preventDefault();
            }}
          >
            내신성적 입력하기
          </button>
          <Autocomplete
            disablePortal
            className="college"
            id="college"
            options={uniList}
            sx={{ ...style, width: 300 }}
            renderInput={(params) => <TextField {...params} label="희망대학" />}
            onChange={(e, value: string | null) => {
              loadMajor(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
          <Autocomplete
            disablePortal
            className="major"
            id="major"
            options={majorList}
            sx={{ ...style, width: 300 }}
            renderInput={(params) => <TextField {...params} label="희망전공" />}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
        </div>
        <Button className="submitButton" type="submit">
          Submit
        </Button>
      </form>
      {isLoading && <Loading />}
      {isOpenModal && (
        <Modal
          onClickToggleModal={onClickToggleModal}
          testScore1={testScore1}
          testScore2={testScore2}
          testScore3={testScore3}
          testScore4={testScore4}
          testScore5={testScore5}
          testScore6={testScore6}
          setTestScore1={setTestScore1}
          setTestScore2={setTestScore2}
          setTestScore3={setTestScore3}
          setTestScore4={setTestScore4}
          setTestScore5={setTestScore5}
          setTestScore6={setTestScore6}
        />
      )}
    </div>
  );
}

export default Form;
