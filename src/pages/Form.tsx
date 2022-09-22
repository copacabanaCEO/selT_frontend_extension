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

interface Props {
  setShowResult: Dispatch<SetStateAction<boolean>>;
  setResult: Dispatch<
    SetStateAction<{
      college_percentage: number;
      feedback: string;
    }>
  >;
  setName: Dispatch<SetStateAction<string>>;
}
function Form({ setShowResult, setResult, setName }: Props) {
  const [isMale, setIsMale] = useState(true);
  const [isJonghap, setIsJonghap] = useState(true);
  const [location, setLocation] = useState("");
  const [uniList, setUniList] = useState([]);
  const [highSchoolList, setHighSchoolList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const [locationList, setLocationList] = useState([]);

  const url = "https://cors-everywhere-me.herokuapp.com/http://52.78.211.155";

  useEffect(() => {
    loadUni();
  }, []);

  function loadUni() {
    fetch(`${url}/selT/college`)
      .then((response) => response.json())
      .then((data) => {
        setUniList(
          data
            .map((el: any) => el.college)
            .filter((c: any, index: any) => {
              return data.map((el: any) => el.college).indexOf(c) === index;
            })
        );
      })
      .catch((err) => console.log("error! :" + err));

    fetch(`${url}/selT/highschool`)
      .then((response) => response.json())
      .then((data) => {
        setHighSchoolList(
          data
            .map((el: any) => el.name)
            .filter((c: any, index: any) => {
              return data.map((el: any) => el.name).indexOf(c) === index;
            })
        );
      })
      .catch((err) => console.log("error! :" + err));
  }

  function loadMajor(uni: any) {
    fetch(`${url}/selT/college?college=${uni}`)
      .then((response) => response.json())
      .then((data) => {
        setMajorList(
          data
            .filter((el: any) => el.college === uni)
            .map((el: any) => el.major)
        );
      })
      .catch((err) => console.log("error! :" + err));
  }
  function loadLocation(uni: any) {
    fetch(`${url}/selT/highschool?name=${uni}`)
      .then((response) => response.json())
      .then((data) => {
        setLocationList(
          data
            .map((el: any) => el.location)
            .filter((c: any, index: any) => {
              return data.map((el: any) => el.location).indexOf(c) === index;
            })
        );
      })
      .catch((err) => console.log("error! :" + err));
  }

  interface infoI {
    name: string;
    email: string;
    is_male: boolean;
    admission_type: string;
    avg_gpa: number; //소수점 확인
    college: {
      college: string;
      major: string;
    };
    highschool: {
      name: string;
      location: string;
    };
  }

  function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const {
      avg_gpa,
      name,
      email,
      // sex,
      admission_type,
      college,
      major,
      highschoolName,
      location,
    } = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
      admission_type: { value: string };
      avg_gpa: { value: number };

      college: { value: string };
      major: { value: string };

      highschoolName: { value: string };
      location: { value: string };
    };

    let data: infoI = {
      name: name.value,
      email: `[${email.value}](mailto:${email.value})`,
      is_male: isMale,
      admission_type: isJonghap ? "종합" : "교과",
      avg_gpa: Number(avg_gpa.value), //소수점 확인
      college: {
        college: college.value,
        major: major.value,
      },
      highschool: {
        name: highschoolName.value,
        location: location.value,
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
        borderColor: "var(--accent-color)",
      },
    },
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <div>
          <div className="nameAndSex">
            <TextField
              name="name"
              label="이름"
              id="nameForm"
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
              sx={style}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
            />
            <button
              className="sex"
              onClick={(e) => {
                e.preventDefault();
                setIsMale((prev) => !prev);
              }}
              style={{
                background: `${
                  isMale
                    ? "var(--main-button-color)"
                    : "var(--main-button-reverse-color)"
                }`,
              }}
            >
              <div
                className="sexToggle"
                style={{
                  transform: `translateX(${isMale ? -30 : 30}%)`,
                  transitionDuration: "0.3s",
                }}
              >
                {isMale ? "남" : "여"}
              </div>
            </button>
          </div>
          <TextField
            id="email"
            label="E-mail"
            type="email"
            required
            sx={style}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          />
        </div>
        <div>
          <button
            id="admission_type"
            onClick={(e) => {
              e.preventDefault();
              setIsJonghap((prev) => !prev);
            }}
            style={{
              background: `${
                isJonghap
                  ? "var(--main-button-color)"
                  : "var(--main-button-reverse-color)"
              }`,
            }}
          >
            <div
              className="admission_toggle"
              style={{
                transform: `translateX(${isJonghap ? -50 : 50}%)`,
                transitionDuration: "0.3s",
              }}
            >
              {isJonghap ? "종합" : "교과"}
            </div>
          </button>
          <TextField
            label="내신점수"
            id="avgGpaForm"
            inputProps={{
              pattern: "[0-9]*.[0-9]*",
            }}
            name="avg_gpa"
            sx={{ ...style, color: "success.main" }}
            required
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          />
        </div>
        <div>
          <Autocomplete
            disablePortal
            id="highschoolName"
            sx={{ ...style, width: 300 }}
            options={highSchoolList}
            renderInput={(params) => (
              <TextField {...params} label="학교명" required />
            )}
            onChange={(e, value: string | null) => {
              loadLocation(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
          <Autocomplete
            disablePortal
            id="location"
            sx={{ ...style, width: 300 }}
            options={locationList}
            onChange={(e) => {
              let target = e.target as HTMLInputElement;
              setLocation(target.innerHTML);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            value={locationList.length === 1 ? locationList[0] : location}
            renderInput={(params) => (
              <TextField {...params} label="지역" required />
            )}
          />
        </div>
        <div>
          <Autocomplete
            disablePortal
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
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default Form;
