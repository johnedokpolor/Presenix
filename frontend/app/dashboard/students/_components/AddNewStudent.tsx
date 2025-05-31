"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function AddNewStudent() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button onClick={() => setOpen(true)} className="bg-purple-900">
        + Add New Student
      </Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <div className="py-3">
                <label>Full Name</label>
                <Input placeholder="Enter Student Name" />
              </div>
              <div className="py-3">
                <label>Matric Number</label>
                <Input placeholder="Enter Student Matric Number" />
              </div>
              <div className="flex gap-2 items-center justify-end pt-4">
                <Button onClick={() => setOpen(false)} variant={"ghost"}>
                  Cancel
                </Button>
                <Button onClick={() => console.log("Saved")}>Save</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewStudent;
