import { auth } from "@/auth";
import { API_HEAD } from "@/lib/utils";
import axios from "axios";
import About from "./(components)/About";
import Activity from "./(components)/Activity";
import Education from "./(components)/Education";
import Experience from "./(components)/Experience";
import Head from "./(components)/Head";
import Skills from "./(components)/Skills";
import Venues from "./(components)/Venues";
import Products from "./(components)/brand/Products";

const Profile = async ({ userData }: any) => {
  const session: any = await auth();

  const postData = await axios
    .get(`${API_HEAD}/posts/user/${userData._id}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error", err));

  return (
    <div>
      <div className="flex flex-col rounded-md border gap-4">
        <Head session={session} userData={userData} />

        <About userData={userData} />

        {userData.role === 'venueOwner' && (
            <Venues venueData={userData} />
        )}

        {userData.role === 'brand' && (
            <Products userData={userData} />
        )}

        {(userData.role === "doctor" || userData.role === "athlete") && (
          <Skills userData={userData} />
        )}

        <Activity postData={postData} />

        {(userData.role === "doctor" || userData.role === "athlete") && (
          <Experience userData={userData} />
        )}

        {userData.role === "doctor" && <Education userData={userData} />}
      </div>
    </div>
  );
};

export default Profile;
