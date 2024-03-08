import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs";
import { log } from "console";
import { redirect } from "next/navigation";

const page = async () => {
  const agencyId = await verifyAndAcceptInvitation();
  console.log(agencyId);
  

  //get user deatils
  const user = await getAuthUserDetails();

  return <div>Agency Dashboard</div>;
};

export default page;
