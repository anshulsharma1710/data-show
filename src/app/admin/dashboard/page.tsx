// "use client";
// import { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Image from "next/image";

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   phone: string;
//   age: number;
//   nationality: string;
//   qualification: string;
//   curr_institution: string;
//   major: string;
//   grad_year: number;
//   pref_country: string;
//   pref_course: string;
//   univ_interest: string;
//   intake_season: string;
//   channel: string;
//   questions: string;
// }

// const USERS_PER_PAGE = 10; // Number of users to display per page

// export default function AdminDashboard() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);

//   const fetchUsers = async () => {
//     console.log("Fetching users...");
//     try {
//       const response = await fetch("/api/admin/getUsers", {
//         method: "GET",
//         headers: {
//           "Cache-Control": "no-store", // Ensures no caching on the server
//         },
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       const data: User[] = await response.json();
//       console.log("Fetched users:", data);
//       setUsers(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Failed to fetch users", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers(); // Fetch users on mount

//     const intervalId = setInterval(fetchUsers, 5000); // Fetch users every 5 seconds

//     return () => clearInterval(intervalId); // Cleanup on unmount
//   }, []);

//   const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
//   const currentUsers = users.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const getValueOrNA = (value: string | number | null | undefined) => (value ? value : "-");


//   if (loading) {
//     return <div>Loading...</div>; // Add a loading state if needed
//   }


//   return (
//     <div>
//       <div className="flex justify-center pb-5">
//         <Image src="/logo.png" width={1625} height={277} alt="Maven Consulting Services Logo" className="w-auto h-20" />
//       </div>

//       <Table>
//         <TableCaption>List of registered users with all details.</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="text-center font-bold border-r border-2 border-black text-black">Name</TableHead>
//             <TableHead className="text-center font-bold border-r border-2 border-black text-black">Email</TableHead>
//             <TableHead className="text-center font-bold border-r border-2 border-black text-black">Phone</TableHead>
//             <TableHead className="text-center font-bold border-r border-2 border-black text-black">Age</TableHead>
//             <TableHead className="text-center font-bold border-r border-2 border-black text-black">Nationality</TableHead>
//             <TableHead className="text-center font-bold border-r border-2 border-black text-black">Qualification</TableHead>
//             <TableHead className="text-center font-bold border-r border-2 border-black text-black">Current Institution</TableHead>
//             <TableHead className="text-center font-bold border-r border-2 border-black text-black">Major</TableHead>
//             <TableHead className="text-center font-bold border-r border-2 border-black text-black">Graduation Year</TableHead>
//             <TableHead className="text-center font-bold border-r border-2 border-black text-black">Preferred Country</TableHead>
//             <TableHead className="text-center font-bold border-r border-2 border-black text-black">Preferred Course</TableHead>
//             <TableHead className="text-center font-bold border-r border-2 border-black text-black">University Interest</TableHead>
//             <TableHead className="text-center font-bold border-r border-2 border-black text-black">Intake Season</TableHead>
//             <TableHead className="text-center font-bold border-r border-2 border-black text-black">Source</TableHead>
//             <TableHead className="text-center font-bold border-r border-2 border-black text-black">Questions</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {currentUsers.map((user, index) => (
//             <TableRow
//               key={user._id}
//               className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
//             >
//               <TableCell className="text-center">{getValueOrNA(user.name)}</TableCell>
//               <TableCell className="text-center">{getValueOrNA(user.email)}</TableCell>
//               <TableCell className="text-center">{getValueOrNA(user.phone)}</TableCell>
//               <TableCell className="text-center">{getValueOrNA(user.age)}</TableCell>
//               <TableCell className="text-center">{getValueOrNA(user.nationality)}</TableCell>
//               <TableCell className="text-center">{getValueOrNA(user.qualification)}</TableCell>
//               <TableCell className="text-center">{getValueOrNA(user.curr_institution)}</TableCell>
//               <TableCell className="text-center">{getValueOrNA(user.major)}</TableCell>
//               <TableCell className="text-center">{getValueOrNA(user.grad_year)}</TableCell>
//               <TableCell className="text-center">{getValueOrNA(user.pref_country)}</TableCell>
//               <TableCell className="text-center">{getValueOrNA(user.pref_course)}</TableCell>
//               <TableCell className="text-center">{getValueOrNA(user.univ_interest)}</TableCell>
//               <TableCell className="text-center">{getValueOrNA(user.intake_season)}</TableCell>
//               <TableCell className="text-center">{getValueOrNA(user.channel)}</TableCell>
//               <TableCell className="text-center">{getValueOrNA(user.questions)}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>

//         <TableFooter>
//           <TableRow>
//             <TableCell colSpan={15}>
//               <div className="flex justify-between items-center">
//                 <div className="text-left font-bold text-black">
//                   Total Users: {users.length}
//                 </div>
//                 <div className="flex justify-end space-x-2">
//                   <button
//                     onClick={handlePreviousPage}
//                     disabled={currentPage === 1}
//                     className="bg-gray-200 rounded-lg px-4 py-2 hover:opacity-75"
//                   >
//                     Previous
//                   </button>
//                   <button
//                     onClick={handleNextPage}
//                     disabled={currentPage === totalPages}
//                     className="bg-gray-200 rounded-lg px-4 py-2 hover:opacity-75"
//                   >
//                     Next
//                   </button>
//                 </div>
//               </div>
//               <div className="text-right text-sm text-gray-500">
//                 Page {currentPage} of {totalPages}
//               </div>
//             </TableCell>
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </div>
//   );
// }

/* */


// /admin/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  nationality: string;
  qualification: string;
  curr_institution: string;
  major: string;
  grad_year: number;
  pref_country: string;
  pref_course: string;
  univ_interest: string;
  intake_season: string;
  channel: string;
  questions: string;
}

const USERS_PER_PAGE = 10; // Number of users to display per page

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchUsers = async () => {
    console.log("Fetching users...");
    try {
      const response = await fetch("/api/admin/getUsers", {
        method: "GET",
        headers: {
          "Cache-Control": "no-store", // Ensures no caching on the server
        },
        cache: 'no-store' // how next js understands no caching on the server
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data: User[] = await response.json();
      console.log("Fetched users:", data);
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on mount

    const intervalId = setInterval(fetchUsers, 5000); // Fetch users every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const currentUsers = users.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getValueOrNA = (value: string | number | null | undefined) => (value ? value : "-");

  if (loading) {
    return <div>Loading...</div>; // Add a loading state if needed
  }

  return (
    <div>
      <div className="flex justify-center pb-5">
        <Image src="/logo.png" width={1625} height={277} alt="Maven Consulting Services Logo" className="w-auto h-20" />
      </div>

      <Table>
        <TableCaption>List of registered users with all details.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center font-bold border-r border-2 border-black text-black">Name</TableHead>
            <TableHead className="text-center font-bold border-r border-2 border-black text-black">Email</TableHead>
            <TableHead className="text-center font-bold border-r border-2 border-black text-black">Phone</TableHead>
            <TableHead className="text-center font-bold border-r border-2 border-black text-black">Age</TableHead>
            <TableHead className="text-center font-bold border-r border-2 border-black text-black">Nationality</TableHead>
            <TableHead className="text-center font-bold border-r border-2 border-black text-black">Qualification</TableHead>
            <TableHead className="text-center font-bold border-r border-2 border-black text-black">Current Institution</TableHead>
            <TableHead className="text-center font-bold border-r border-2 border-black text-black">Major</TableHead>
            <TableHead className="text-center font-bold border-r border-2 border-black text-black">Graduation Year</TableHead>
            <TableHead className="text-center font-bold border-r border-2 border-black text-black">Preferred Country</TableHead>
            <TableHead className="text-center font-bold border-r border-2 border-black text-black">Preferred Course</TableHead>
            <TableHead className="text-center font-bold border-r border-2 border-black text-black">University Interest</TableHead>
            <TableHead className="text-center font-bold border-r border-2 border-black text-black">Intake Season</TableHead>
            <TableHead className="text-center font-bold border-r border-2 border-black text-black">Source</TableHead>
            <TableHead className="text-center font-bold border-r border-2 border-black text-black">Questions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user, index) => (
            <TableRow
              key={user._id}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <TableCell className="text-center">{getValueOrNA(user.name)}</TableCell>
              <TableCell className="text-center">{getValueOrNA(user.email)}</TableCell>
              <TableCell className="text-center">{getValueOrNA(user.phone)}</TableCell>
              <TableCell className="text-center">{getValueOrNA(user.age)}</TableCell>
              <TableCell className="text-center">{getValueOrNA(user.nationality)}</TableCell>
              <TableCell className="text-center">{getValueOrNA(user.qualification)}</TableCell>
              <TableCell className="text-center">{getValueOrNA(user.curr_institution)}</TableCell>
              <TableCell className="text-center">{getValueOrNA(user.major)}</TableCell>
              <TableCell className="text-center">{getValueOrNA(user.grad_year)}</TableCell>
              <TableCell className="text-center">{getValueOrNA(user.pref_country)}</TableCell>
              <TableCell className="text-center">{getValueOrNA(user.pref_course)}</TableCell>
              <TableCell className="text-center">{getValueOrNA(user.univ_interest)}</TableCell>
              <TableCell className="text-center">{getValueOrNA(user.intake_season)}</TableCell>
              <TableCell className="text-center">{getValueOrNA(user.channel)}</TableCell>
              <TableCell className="text-center">{getValueOrNA(user.questions)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>


      <div className="w-full flex flex-col gap-4">
        <div className="flex w-full justify-around items-center">
          <div className="text-left font-bold text-black">
            Total Users: {users.length}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="bg-gray-200 rounded-lg px-4 py-2 hover:opacity-75"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="bg-gray-200 rounded-lg px-4 py-2 hover:opacity-75"
            >
              Next
            </button>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 py-4 pb-8">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    </div>
  );
}
