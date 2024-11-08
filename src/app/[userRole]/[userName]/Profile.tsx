import About from "./(components)/About";
import Products from "./(components)/brand/Products";
import Education from "./(components)/Education";
import Experience from "./(components)/Experience";
import Head from "./(components)/Head";
import Posts from "./(components)/Posts";
import Skills from "./(components)/Skills";

const Profile = async ({ userData }: any) => {

  return (
    <div>
      <>
        {userData.role === "venue" ? (
          <h1>hello</h1>
        ) : (
          <div className="flex flex-col rounded-md border gap-4">
            <Head userData={userData} />

            <About userData={userData} />

            {userData.role === "brand" && <Products userData={userData} />}

            {(userData.role === "doctor" || userData.role === "athlete") && (
              <Skills userData={userData} />
            )}

            <Posts userData={userData} />

            {(userData.role === "doctor" || userData.role === "athlete") && (
              <Experience userData={userData} />
            )}

            {userData.role === "doctor" && <Education userData={userData} />}
          </div>
        )}
      </>
    </div>
  );
};

export default Profile;
