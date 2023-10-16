import React, { useState } from "react";
import { getAuth, updateProfile, deleteUser } from "firebase/auth";
import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import ProfileEditForm from "./ProfileEditForm";
import { useNavigate } from "react-router-dom";
import MissionStatement from "../SignInControl/MissionStatement";

export default function AuthProfile() {
  const ContainerStyles = {
    display: "flex",
    justifyContent: "center",
    color: "white",
    fontSize: 16,
    fontFamily: "courier",
    fontWeight: "400",
    backgroundColor: "black",
    padding: "10px",
    width: 360,

    // height: 720,
    // border: "1px solid #ccc",
    gap: 32,
  };

  const formStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const userInfoStyle = {
    display: "flex",
    flexDirection: "column",
    borderRadius: "25px",
    color: "white",
    fontSize: 20,
    fontFamily: "courier",
    // fontWeight: "400",
    alignItems: "center",
    backgroundColor: "black",
    padding: "10px",
    width: 360,
    border: "1px solid #ccc",
  };
  const userImageStyle = {
    display: "flex",
    flexDirection: "column",
    borderRadius: "25px",
    fontWeight: "400",
    color: "white",
    fontSize: 20,
    fontFamily: "courier",
    fontWeight: "400",
    alignItems: "center",
    backgroundColor: "black",
    padding: "10px",
    // paddingTop: "100px",
    width: 360,
    border: "1px solid #ccc",
  };
  const inputStyles = {
    margin: "4px",
    padding: "4px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "12px",
  };

  const buttonStyles = {
    width: 180,
    height: 20,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 20,
    paddingBottom: 20,
    background: "black",
    boxShadow: "6px 6px 6px #E3A9FF",
    border: "2px #E3A9FF solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    color: "white",
  };
  const imgStyle = {
    objectFit: "cover",
    borderRadius: "50%",
    height: "259px",
    width: "259px",
    borderRadius: "50%",
    paddingTop: "20px",
  };

  const auth = getAuth();
  const storage = getStorage();
  const [editProfile, setEditProfile] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(
    auth.currentUser.displayName
  );
  const [editProfileImage, setEditProfileImage] = useState(
    auth.currentUser.photoURL
  );
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleteProfile, setDeleteProfile] = useState(false);
  const navigate = useNavigate();

  async function profileImageUpdate(event) {
    event.preventDefault();
    if (!selectedImage) {
      return;
    }

    const fileRef = ref(storage, "profile/" + auth.currentUser.uid + ".png");
    const uploadTask = uploadBytesResumable(fileRef, selectedImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        // Handle errors
        console.error(error);
        setLoading(false); // Add this line to stop loading
      },
      () => {
        // Upload complete
        getDownloadURL(fileRef).then(async (photoURL) => {
          await updateProfile(auth.currentUser, { photoURL });
          setLoading(false);
          setUploadProgress(0); // Reset progress to 0
          alert("File Uploaded");
          setEditProfileImage(false);
        });
      }
    );

    setLoading(true);
  }
  //   console.log(fileRef);
  //   setLoading(true);
  //   await uploadBytes(fileRef, selectedImage);
  //   const photoURL = await getDownloadURL(fileRef);
  //   await updateProfile(auth.currentUser, { photoURL });
  //   setLoading(false);
  //   alert("File Uploaded");

  //   setEditProfileImage(false);
  // }
  function handleImageChange(event) {
    setSelectedImage(event.target.files[0]);
  }
  function DeleteUser() {
    const user = auth.currentUser;

    user
      .delete()
      .then(() => {
        // User deleted.
        console.log("User Account Deleted Successful");
        navigate("/");
      })
      .catch((error) => {
        // An error occurred
        // ...
      });
  }
  if (editProfile) {
    return (
      <>
        <div style={ContainerStyles}>
          <div>
            <ProfileEditForm
              auth={auth}
              newDisplayName={newDisplayName}
              setNewDisplayName={setNewDisplayName}
              editProfile={editProfile}
              setEditProfile={setEditProfile}
            />
          </div>
        </div>
      </>
    );
  }
  if (editProfileImage === true) {
    return (
      <div
        style={{
          height: "80vh",
          // alignItems: "center",
          background: "black",
          fontSize: 32,
          // width: 200,
          // padding: 20,
          display: "flex",
          flexDirection: "column",
          color: "white",
          // textDecorationColor: "green",
          // borderRadius: "25px",
          // border: "6px solid #ccc",
          // margin: 10,
        }}
      >
        <form onSubmit={profileImageUpdate} style={formStyles}>
          <h2>Update Image</h2>

          <input
            style={{ flexDirection: "column" }}
            type="file"
            onChange={handleImageChange}
          />

          <button type="submit" style={buttonStyles}>
            Update
          </button>
          <button
            style={buttonStyles}
            onClick={() => setEditProfileImage(false)}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
  if (deleteProfile === true) {
    return (
      <button onClick={DeleteUser} style={buttonStyles}>
        Delete Profile
      </button>
    );
  }
  if (
    auth.currentUser.photoURL === null &&
    auth.currentUser.displayName === null
  ) {
    return (
      <>
        <div style={ContainerStyles}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontFamily: "Courier",
                fontSize: 40,
                fontWeight: "400",
                paddingBottom: 36,
                paddingTop: 36,
              }}
            >
              Please Upload A Photo
            </div>

            <div style={userImageStyle}>
              <img
                style={imgStyle}
                src={auth.currentUser.photoURL}
                alt="Profile"
              ></img>{" "}
              <div
                style={{
                  marginTop: "10px",
                }}
              ></div>
              <button
                style={buttonStyles}
                onClick={() => setEditProfileImage(true)}
              >
                Update Photo
              </button>{" "}
              <div
                style={{
                  marginTop: "10px",
                }}
              ></div>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (
    auth.currentUser.photoURL !== null &&
    auth.currentUser.displayName === null
  ) {
    return (
      <>
        <div style={ContainerStyles}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontFamily: "Courier",
                fontSize: 40,
                fontWeight: "400",
                paddingBottom: 36,
                paddingTop: 36,
              }}
            >
              Please Enter a Display Name
            </div>

            <div
              style={{
                paddingTop: 36,
              }}
            ></div>
            <div style={userInfoStyle}>
              <p>User Name: {auth.currentUser.displayName}</p>
              <button style={buttonStyles} onClick={() => setEditProfile(true)}>
                Update Name
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (
    auth.currentUser.photoURL !== null &&
    auth.currentUser.displayName !== null
  ) {
    return (
      <>
        <div style={{
          display: "flex",
          backgroundColor: "black",
          justifyContent: "center",
        }}>
          <div style={ContainerStyles}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontFamily: "Courier",
                  fontSize: 40,
                  fontWeight: "400",
                  paddingBottom: 36,
                  paddingTop: 36,
                }}
              >
                Profile
              </div>

              <div style={userImageStyle}>
                <img
                  style={imgStyle}
                  src={auth.currentUser.photoURL}
                  alt="Profile"
                ></img>{" "}
                <div
                  style={{
                    marginTop: "10px",
                  }}
                ></div>
                <button
                  style={buttonStyles}
                  onClick={() => setEditProfileImage(true)}
                >
                  Update Photo
                </button>{" "}
                <div
                  style={{
                    marginTop: "10px",
                  }}
                ></div>
              </div>
              <div
                style={{
                  paddingTop: 36,
                }}
              ></div>
              <div style={userInfoStyle}>
                {/* <p>User Name</p> */}
                <p>{auth.currentUser.displayName}</p>
                <button
                  style={buttonStyles}
                  onClick={() => setEditProfile(true)}
                >
                  Update Name
                </button>
              </div>
              <div
                style={{
                  paddingTop: 36,
                }}
              ></div>
              <div style={userInfoStyle}>
                <p>{auth.currentUser.email}</p>
                <button
                  style={buttonStyles}
                  onClick={() => setDeleteProfile(true)}
                >
                  Delete Account?
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
