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
import "../../../styles/variables.scss";
import "./Form.scss";

interface form_props {
  setShowResult: Dispatch<SetStateAction<boolean>>;
  setResult: Dispatch<
    SetStateAction<{
      college_percentage: number;
      feedback: string;
    }>
  >;
  setName: Dispatch<SetStateAction<string>>;
}

function Form({ setShowResult, setResult, setName }: form_props) {
  const [isMale, setIsMale] = useState(true);
  const [isJonghap, setIsJonghap] = useState(true);
  const [location, setLocation] = useState("");
  const [uniList, setUniList] = useState([]);
  const [highSchoolList, setHighSchoolList] = useState([]);
  const [majorList, setMajorList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [resize, setResize] = useState(0);

  const url = "https://cors-everywhere-me.herokuapp.com/http://52.78.211.155";
  const main_button_color = `linear-gradient(
    -90deg,
    rgba(86, 157, 189) 0%,
    rgba(108, 55, 107) 30%,
    rgba(108, 55, 107) 50%,
    rgba(205, 87, 156) 100%
  )`;
  const accent_color = `rgb(88, 215, 231)`;

  useEffect(() => {
    load_uni();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setResize(window.innerWidth);
    });

    const time = setTimeout(() => {
      setResize(window.innerWidth);
    }, 0.0000000000000000001);

    return () => {
      window.removeEventListener("resize", () => {
        setResize(window.innerWidth);
      });

      clearTimeout(time);
    };
  }, []);

  const load_uni = () => {
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
  };

  const load_major = (uni: any) => {
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
  };
  const load_location = (uni: any) => {
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
  };

  interface infoI {
    name: string;
    email: string;
    is_male: boolean;
    admission_type: string;
    avg_gpa: number;
    college: {
      college: string;
      major: string;
    };
    highschool: {
      name: string;
      location: string;
    };
  }

  const submit_form = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { avg_gpa, name, email, college, major, highschoolName, location } =
      e.target as typeof e.target & {
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

    const request_options: any = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(`${url}/selT/college-prediction`, request_options)
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
        setShowResult(true);
      })
      .catch((err) => console.log("error! :" + err));
  };

  const style = {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: accent_color,
      },
    },
  };

  return (
    <div className="form">
      <form
        className="form_wrap"
        onSubmit={(e) => {
          submit_form(e);
          setIsLoading(true);
        }}
      >
        <div className="input_wrap">
          <div className="name_and_sex">
            <TextField
              className="name"
              id="name"
              label="이름"
              autoComplete="on"
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
                background: main_button_color,
              }}
            >
              <div
                className="sex_toggle"
                style={{
                  transform: `translateX(${
                    resize > 750 ? (isMale ? -18 : 18) : isMale ? -9 : 9
                  }px)`,
                  transitionDuration: "0.3s",
                }}
              >
                {isMale ? "남" : "여"}
              </div>
            </button>
          </div>
          <TextField
            className="email"
            id="email"
            label="E-mail"
            autoComplete="on"
            type="email"
            required
            sx={style}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          />
        </div>
        <div className="input_wrap">
          <button
            className="admission_type"
            onClick={(e) => {
              e.preventDefault();
              setIsJonghap((prev) => !prev);
            }}
            style={{
              background: main_button_color,
            }}
          >
            <div
              className="admission_toggle"
              style={{
                transform: `translateX(${
                  resize > 750 ? (isJonghap ? -87 : 87) : isJonghap ? -62 : 62
                }px)`,
                transitionDuration: "0.3s",
              }}
            >
              {isJonghap ? "종합" : "교과"}
            </div>
          </button>
          <TextField
            label="내신점수"
            autoComplete="on"
            className="avg_gpa"
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
        <div className="input_wrap">
          <Autocomplete
            disablePortal
            className="highschoolName"
            id="highschoolName"
            sx={{ ...style, width: 300 }}
            options={highSchoolList}
            renderInput={(params) => (
              <TextField {...params} label="학교명" required />
            )}
            onChange={(e, value: string | null) => {
              load_location(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
          <Autocomplete
            disablePortal
            className="location"
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
        <div className="input_wrap">
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
              load_major(value);
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
        <Button className="submit_button" type="submit">
          Submit
        </Button>
      </form>
      {isLoading && <Loading />}
    </div>
  );
}

export default Form;
