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

interface Props {
  setShowResult: Dispatch<SetStateAction<boolean>>;
  setResult: Dispatch<
    SetStateAction<{
      collegePercentage: number;
      feedback: string;
    }>
  >;
  setName: Dispatch<SetStateAction<string>>;
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
type majorList = string[];

function Form({ setShowResult, setResult }: Props) {
  const [isSubject, setIsSubject] = useState(true);
  const [uniList, setUniList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const url = "http://43.201.70.179:8000";
  const accentColor = `lightgreen`;

  useEffect(() => {
    loadUniversityList();
    loadMajor();
  }, []);

  async function loadUniversityList() {
    try {
      const res = await fetch(`${url}/selT/college`);
      const data = await res.json();
      const test = data.reduce((acc: uniList, cur: CollegeObject) => {
        if (!acc.includes(cur.college)) {
          return [...acc, cur.college];
        }
        return acc;
      }, []);
      setUniList(test);
    } catch (e) {
      console.log("error! :" + e);
    }
  }
  //console.log("uniList", uniList);

  async function loadMajor() {
    try {
      const res = await fetch(`${url}/selT/college?college`);
      const data = await res.json();
      const test = data.reduce((acc: majorList, cur: MajorObject) => {
        if (!acc.includes(cur.major)) {
          return [...acc, cur.major];
        }
        return acc;
      }, []);
      setMajorList(test);
    } catch (e) {
      console.log("error! :" + e);
    }
  }
  //console.log("majorList", majorList);

  // const load_major = (uni: any) => {
  //   fetch(`${url}/selT/college?college=${uni}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMajorList(
  //         data
  //           .filter((el: any) => el.college === uni)
  //           .map((el: any) => el.major)
  //       );
  //     })
  //     .catch((err) => console.log("error! :" + err));
  // };

  interface infoI {
    admissionType: string;
    avgGpa: number; //소수점 확인
    college: {
      college: string;
      major: string;
    };
  }

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { avgGpa, college, major } = e.target as typeof e.target & {
      admissionType: { value: string };
      avgGpa: { value: number };
      college: { value: string };
      major: { value: string };
    };

    let data: infoI = {
      admissionType: isSubject ? "교과" : "종합",
      avgGpa: Number(avgGpa.value), //소수점 확인
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
      .then((response) => response.json())
      .then((data) => {
        setResult(data);

        setShowResult(true);
      })
      .catch((err) => console.log("error! :" + err));
  }

  const style = {
    "& label.Mui-focused": {
      color: "green",
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
              pattern: "[0-9]*.[0-9]*",
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
              loadMajor();
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
