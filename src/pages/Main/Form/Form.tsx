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

interface Props {
  setShowResult: Dispatch<SetStateAction<boolean>>;
  setResult: Dispatch<
    SetStateAction<{
      예측결과: number;
      진단결과: { college: string; college_percentage: number; major: string };
      피드백: string;
    }>
  >;
  setName: Dispatch<SetStateAction<string>>;
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

interface MajorObject {
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

  useEffect(() => {
    loadUniversityList();
  }, []);

  async function loadUniversityList() {
    const res = await fetch(`${url}/selT/college-event`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY1NjM0ODE3LCJpYXQiOjE2NjU2Mjc2MTcsImp0aSI6ImM5NzI3MjNiZjQzNDRkOWJiYmM2YzgyMzgwMWMwYmMxIiwidXNlcl9pZCI6Mzl9.8l-T5SKovWpxQ4w_Gg9N859FlNLgtLRDxyqaJtkzsr4
        `,
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
