import { auth } from "@/auth";
import { BASE_URL } from "@/lib/utils";
import axios from "axios";
import About from "./(components)/About";
import Activity from "./(components)/Activity";
import Experience from "./(components)/Experience";
import Head from "./(components)/Head";
import Skills from "./(components)/Skills";
import Education from "./(components)/Education";
import Venues from "./(components)/Venues";

const Profile = async ({ userData }: any) => {
  const session: any = await auth();

  const postData = await axios
    .get(`${BASE_URL}/api/posts/user/${userData._id}`)
    .then((res) => res.data)
    .catch((err) => console.error("Error", err));

  return (
    <div>
      <div className="flex flex-col rounded-md border gap-10">
        <Head session={session} userData={userData} />

        <About userData={userData} />

        {userData.role === 'venueOwner' && (
            <Venues venueData={userData} />
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
