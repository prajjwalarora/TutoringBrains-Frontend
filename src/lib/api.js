const url = `http://localhost:8080/api/v1`;
// const url = `https://tutoringbrains-backend-1.herokuapp.com/api/v1`

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
