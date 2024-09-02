"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = ({ticket}) => {
  const ADDMODE = ticket._id === "new";
  
  console.log("ADDMODE", ADDMODE);
  
  const router = useRouter();
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var formDataStr = JSON.stringify({formData});
    console.log("formDataStr",formDataStr);
    
    if(ADDMODE) {
      const rsp = await fetch("/api/Tickets", {
        method: "POST",
        body: formDataStr,
        "content-type": "application/json"
      })
      
      if (!rsp.ok) {
        throw new Error("Failed to create the ticket")
      }
    }
    else {
      const rsp = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        body: formDataStr,
        "content-type": "application/json"
      })
      
      if (!rsp.ok) {
        throw new Error("Failed to edit the ticket")
      }
    }

    router.refresh()
    router.push("/")
  };
  const startingTicketData = {
    title: "",
    description: "",
    priority: 1,
    progress: 0,
    status: "not started",
    category: "Hardware Issue",
  };
  if(!ADDMODE) {
    startingTicketData.title = ticket.title;
    startingTicketData.description = ticket.description;
    startingTicketData.priority = ticket.priority;
    startingTicketData.progress = ticket.progress;
    startingTicketData.status = ticket.status;
    startingTicketData.category = ticket.category;
  }

  const [formData, setFormData] = useState(startingTicketData);
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{ADDMODE ? "Create Ticket" : "Edit Ticket"}</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Hardware Issue">Hardware Issue</option>
          <option value="Software Issue">Software Issue</option>
          <option value="Project">Project</option>
        </select>

        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          type="range"
          id="progress"
          name="progress"
          value={formData.progress}
          onChange={handleChange}
        />
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="not started">Not Started</option>
          <option value="started">Started</option>
          <option value="done">Done</option>
        </select>
        <input type="submit" className="btn" value={ADDMODE ? "Create Ticket" : "Done"} />
      </form>
    </div>
  );
};

export default TicketForm;
