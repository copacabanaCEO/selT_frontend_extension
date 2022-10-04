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

type uniList = string[];

function Form({ setShowResult, setResult, result }: Props) {
  const [isSubject, setIsSubject] = useState(false);
  const [uniList, setUniList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const url = "http://10.36.180.206:8000";
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
    highschool: {
      name: "평촌고";
      location: "경기";
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
      highschool: {
        name: "평촌고",
        location: "경기",
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
        onSubmit={(e) => {
          submitForm(e);
          setIsLoading(true);
        }}
        className="formWrap"
      >
        <div className="inputWrap">
          <SubjectToggle setIsSubject={setIsSubject} isSubject={isSubject} />
          <TextField
            className="avgGpa"
            label="내신점수"
            id="avgGpaForm"
            inputProps={{
              pattern: "[0-9].*[0-9]*",
            }}
            name="avgGpa"
            sx={{ ...style, color: "success.main" }}
            required
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          />
          <Autocomplete
            disablePortal
            className="college"
            id="college"
            options={uniList}
            sx={{ ...style, width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="희망대학" required />
            )}
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
            renderInput={(params) => (
              <TextField {...params} label="희망전공" required />
            )}
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
    </div>
  );
}

export default Form;
