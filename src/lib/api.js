let url, url2;
// const url = `https://tutoringbrains-backend-1.herokuapp.com/api/v1`;

if (process.env.NODE_ENV === "development") {
  url = `http://192.168.29.30:8080/api/v1`;
  url2 = `http://localhost:5000/auth`;
  // url = `http://192.168.1.9:8080/api/v1`;
} else {
  url = `https://tutoringbrains-backend-1.herokuapp.com/api/v1`;
  url2 = `https://tutoringbrains-backend-flask.herokuapp.com/auth`;
}

export async function signup(userData) {
  const response = await fetch(`${url}/users/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Could not Create Account.");
  }
  return data.data;
}
export async function login(userData) {
  const response = await fetch(`${url}/users/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      data.message || "Login error, Please verify your credentials."
    );
  }
  return data.data;
}

export async function uploadImage(userData) {
  const response = await fetch(`${url}/auth/authImage`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Login error, Please uplpading your face.");
  }
  return data.data;
}

export async function getMe({ token }) {
  const response = await fetch(`${url}/users/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    // body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, Please verify your credentials.");
  }
  return data.data;
}

export async function updateMe({ token, userData }) {
  console.log(token);
  const response = await fetch(`${url}/users/me`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, Please verify your credentials.");
  }
  return data.data;
}

export async function registerDevice({ token, deviceData }) {
  console.log(token);
  const response = await fetch(`${url}/users/registerDevice`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(deviceData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, Please verify request.");
  }
  return data.data;
}

export async function getAssessment({ token, assessmentId }) {
  const response = await fetch(`${url}/assessments/${assessmentId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    // body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, While fetching assessment.");
  }
  return data.data;
}

export async function getUnpublishedAssessment({ token }) {
  const response = await fetch(
    `${url}/assessments/author-only?published=false`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      // body: JSON.stringify(userData),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, While fetching assessment.");
  }
  return data.data;
}

export async function getPublishedAssessment({ token }) {
  const response = await fetch(
    `${url}/assessments/author-only?published=true`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      // body: JSON.stringify(userData),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, While fetching assessment.");
  }
  return data.data;
}

export async function publishedAssessment({
  token,
  assessmentId,
  publishData,
}) {
  const response = await fetch(
    `${url}/assessments/publish-assessment/${assessmentId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(publishData),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, While fetching assessment.");
  }
  return data.data;
}

export async function getStudentAssessment({ token }) {
  const response = await fetch(`${url}/assessments/student-only`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    // body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, While fetching assessment.");
  }
  return data.data;
}

export async function getStudent({ token, email }) {
  const response = await fetch(`${url}/users/student?email=${email}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    // body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, While fetching assessment.");
  }
  return data.data;
}

//
// export async function getUser(userData) {
//   const response = await fetch(`${url}/user/${userData.userId}`, {
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${userData.authToken}`,
//     },
//   });

//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.message || "Error in fetching user details");
//   }
//   return data.data;
// }
// export async function updateUser(userData) {
//   const response = await fetch(`${url}/user`, {
//     method: "PUT",
//     headers: {
//       "Content-type": "application/json",
//       Authorization: `Bearer ${userData.authToken}`,
//     },
//     body: JSON.stringify(userData.updatedData),
//   });

//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.message || "Error in fetching user details");
//   }
//   return data.data;
// }

export async function getAssessments({ token, assessmentData }) {
  const response = await fetch(`${url}/assessments`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });

  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Could not get Assessment.");
  }
  return data.data;
}

export async function createAssessment({ token, assessmentData }) {
  const response = await fetch(`${url}/assessments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(assessmentData),
  });

  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Could not Create Assessment.");
  }
  return data.data;
}

export async function addSubIntoAssessment({
  token,
  assessmentid,
  assessmentData,
}) {
  const response = await fetch(`${url}/assessments/${assessmentid}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(assessmentData),
  });

  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Could not Create Assessment.");
  }
  return data.data;
}

export async function createSubject({ token, subjectData }) {
  const response = await fetch(`${url}/subjects`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(subjectData),
  });

  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Could not Create Subject.");
  }
  return data.data;
}

export async function createQuestion({ token, questionData }) {
  const response = await fetch(`${url}/questions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(questionData),
  });

  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Could not Create Question.");
  }
  return data.data;
}

export async function addSubIntoSubject({ token, subjectid, subjectData }) {
  const response = await fetch(`${url}/subjects/${subjectid}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(subjectData),
  });

  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Could not Add to Subject.");
  }
  return data.data;
}

export async function assessmentSubmission({ token, responseData }) {
  const response = await fetch(`${url}/assessments-submission`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(responseData),
  });

  const data = await response.json();
  console.log(data);
  if (!response.ok) {
    throw new Error(data.message || "Could not Create Assessment.");
  }
  return data.data;
}

export async function getAssessmentSubmission({ token }) {
  const response = await fetch(`${url}/assessments-submission`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    // body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, While fetching submission.");
  }
  return data.data;
}

export async function scheduleClass({ token, classData }) {
  const response = await fetch(`${url}/classes/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(classData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, While Scheduling classess.");
  }
  return data.data;
}

export async function getStudentClasses({ token }) {
  const response = await fetch(`${url}/classes/student-only`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    // body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, While fetching classess.");
  }
  return data.data;
}

export async function getAuthorClassess({ token }) {
  const response = await fetch(`${url}/classes/author-only`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    // body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, While fetching classess.");
  }
  return data.data;
}

export async function getStudentValidation({ token, validationData }) {
  const response = await fetch(`${url}/classes/student-validation`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(validationData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, While validating student.");
  }
  return data.data;
}

export async function getAuthorValidation({ token, validationData }) {
  const response = await fetch(`${url}/classes/author-validation`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(validationData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, While validating student.");
  }
  return data.data;
}

export async function generateResult({ token, assessmentData }) {
  const response = await fetch(`${url}/assessments-submission/result`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(assessmentData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, While validating student.");
  }
  return data.data;
}

export async function getResult({ token, assessmentId }) {
  const response = await fetch(
    `${url}/assessments-submission/result/${assessmentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      // body: JSON.stringify(assessmentData),
    }
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "error, While validating student.");
  }
  return data.data;
}

export async function verifySpeech(speechData) {
  const response = await fetch(`${url2}/audio-verify`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(speechData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data || "error, While verifing audio.");
  }
  return data;
}
