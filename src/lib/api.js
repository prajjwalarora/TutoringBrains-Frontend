let url;
// const url = `https://tutoringbrains-backend-1.herokuapp.com/api/v1`;

if (process.env.NODE_ENV === "development") {
  url = `http://192.168.29.30:8080/api/v1`;
} else {
  url = `https://tutoringbrains-backend-1.herokuapp.com/api/v1`;
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
