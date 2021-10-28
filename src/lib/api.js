const url = `http://192.168.1.4:8080/api/v1`;

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
