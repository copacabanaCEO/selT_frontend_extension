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
    국U: 0,
    국S: 0,
    수U: 0,
    수S: 0,
    영U: 0,
    영S: 0,
    사U: 0,
    사S: 0,
    과U: 0,
    과S: 0,
  });
  const [testScore2, setTestScore2] = useState({
    국U: 0,
    국S: 0,
    수U: 0,
    수S: 0,
    영U: 0,
    영S: 0,
    사U: 0,
    사S: 0,
    과U: 0,
    과S: 0,
  });
  const [testScore3, setTestScore3] = useState({
    국U: 0,
    국S: 0,
    수U: 0,
    수S: 0,
    영U: 0,
    영S: 0,
    사U: 0,
    사S: 0,
    과U: 0,
    과S: 0,
  });
  const [testScore4, setTestScore4] = useState({
    국U: 0,
    국S: 0,
    수U: 0,
    수S: 0,
    영U: 0,
    영S: 0,
    사U: 0,
    사S: 0,
    과U: 0,
    과S: 0,
  });
  const [testScore5, setTestScore5] = useState({
    국U: 0,
    국S: 0,
    수U: 0,
    수S: 0,
    영U: 0,
    영S: 0,
    사U: 0,
    사S: 0,
    과U: 0,
    과S: 0,
  });
  const [testScore6, setTestScore6] = useState({
    국U: 0,
    국S: 0,
    수U: 0,
    수S: 0,
    영U: 0,
    영S: 0,
    사U: 0,
    사S: 0,
    과U: 0,
    과S: 0,
  });

  const navigate = useNavigate();

  const url = "http://10.36.180.175:8000";
  const accentColor = `lightgreen`;

  /**
   * Form최초 렌더링시 실행되어 대학교 리스트를 받아오는 함수입니다.
   */
  useEffect(() => {
    loadUniversityList();
  }, []);

  /**
   * Form최초 렌더링시 실행되어 대학교 리스트를 받아오는 함수입니다.
   * 상단의 useEffect에서 실행됩니다.
   */
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

  /**
   * 대학교 선택시 실행되어 관련 학과 리스트를 받아오는 함수입니다.
   * [종합, 교과] 와 선택된 대학교를 기준으로 쿼리스트링을 통해서 데이터를 fetching합니다.
   */
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

  /**
   * 합격률 조회시 호출되는 API의 Body애 담겨지는 객체의 타입입니다.
   */
  interface infoI {
    admission_type: string;
    testscore: [
      {
        subject: "국어";
        grade: 1;
        semester: 1;
        unit: number;
        score: number;
      }
    ];
    college?: {
      college: string;
      major: string;
    };
  }

  /**
   * FormEvent발생시 실행되는 함수입니다.
   * 희망대학, 학과를 선택하지 않았을경우와 선택했을 경우가 존재합니다.
   */
  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { college, major } = e.target as typeof e.target & {
      college: { value: string };
      major: { value: string };
    };

    let data: infoI =
      college.value !== ""
        ? {
            admission_type: isSubject ? "교과" : "종합",
            testscore: [
              {
                subject: "국어",
                grade: 1,
                semester: 1,
                unit: Number(testScore1.국U),
                score: Number(testScore1.국S),
              },
            ],
            college: {
              college: college.value,
              major: major.value,
            },
          }
        : {
            admission_type: isSubject ? "교과" : "종합",
            testscore: [
              {
                subject: "국어",
                grade: 1,
                semester: 1,
                unit: Number(testScore1.국U),
                score: Number(testScore1.국S),
              },
            ],
          };

    const requestOptions: any = {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY1NjQyNTk1LCJpYXQiOjE2NjU2MzUzOTUsImp0aSI6ImQwMjYwNzM2NTRjMzQwYmQ4ZjE1MDE1NzFhM2Y2NjNhIiwidXNlcl9pZCI6NDB9.xpjz_aYlMU_oSr4oCPISbNyG9T8H6kEYKp8OqGsVjAo`,
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

  /**
   * 내신 입력 모달을 display속성을 컨트롤하는 함수입니다.
   */
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
