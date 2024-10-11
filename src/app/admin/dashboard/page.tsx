"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  _id: string;
  fname: string;
  lname: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    console.log("Fetching users...");
    try {
      const response = await fetch("/api/admin/getUsers");
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

  if (loading) {
    return <div>Loading...</div>; // Add a loading state if needed
  }

  return (
    <Table>
      <TableCaption>List of registered users with their first and last names.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id}>
            <TableCell className="font-medium">{user.fname}</TableCell>
            <TableCell>{user.lname}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2} className="text-right">
            Total Users: {users.length}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
