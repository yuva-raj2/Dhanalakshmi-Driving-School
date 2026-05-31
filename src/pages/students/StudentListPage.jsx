import { useState } from "react";

import StudentFilters from "../../components/students/StudentFilters";
import StudentTable from "../../components/students/StudentTable";
import StudentForm from "../../components/students/StudentForm";

const mockStudents = [
  {
    id: 1,
    name: "Ravi Kumar",
    phone: "9876543210",
    course: "Heavy Vehicle",
    status: "Active",
  },
  {
    id: 2,
    name: "Manikandan",
    phone: "9876543211",
    course: "Truck Training",
    status: "Active",
  },
];

export default function StudentListPage() {
  const [search, setSearch] =
    useState("");

  const filteredStudents =
    mockStudents.filter(
      (student) =>
        student.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const handleCreateStudent =
    (data) => {
      console.log(data);
    };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">
        Students
      </h1>

      <StudentFilters
        search={search}
        setSearch={setSearch}
      />

      <StudentTable
        students={filteredStudents}
      />

      <StudentForm
        onSubmit={
          handleCreateStudent
        }
      />
    </div>
  );
}