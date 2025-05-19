
import React from "react";
import { Student } from "@/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface StudentCardProps {
  student: Student;
  className?: string;
}

const StudentCard = ({ student, className }: StudentCardProps) => {
  return (
    <Card className={`glass-panel animate-scale-in ${className || ""}`}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl text-blue-accent">{student.Name}</CardTitle>
          <Badge variant="outline" className="bg-blue-accent/10 text-blue-accent border-blue-accent/20">
            {student.Dept}
          </Badge>
        </div>
        <CardDescription>Reg No: {student.Reg_No}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Date of Birth</p>
            <p>{student.DOB}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Blood Group</p>
            <p>{student.Blood_Group}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Gender</p>
            <p>{student.Gender}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p>{student.Phone}</p>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-1">Bio</p>
          <p className="text-sm italic">{student.Bio}</p>
        </div>
      </CardContent>
      <CardFooter className="text-right">
        <span className="text-xs text-muted-foreground">
          {student.Created_At ? `Added on ${format(new Date(student.Created_At), 'MMM d, yyyy')}` : "Recently added"}
        </span>
      </CardFooter>
    </Card>
  );
};

export default StudentCard;
