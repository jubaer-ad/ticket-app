import TicketForm from "@/app/(components)/TicketForm";

const TicketPage = async ({ params }) => {

  const getTicketById = async (id) => {
    try {
      const rsp = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
        cache: "no-store"
      });

      if(!rsp.ok) {
        throw new Error(`failed to get ticket ${id}`)
      }
      return rsp.json()

    } catch (err) {
      console.log(err);
      
    }
  }

  
  const ADDMODE = params.id === "new";
  
  var editTicketData = {};

  if(!ADDMODE) {
    editTicketData = await getTicketById(params.id);
    editTicketData = editTicketData.ticket
  }
  else {
    editTicketData = {
      _id: "new"
    }
  }
  return <TicketForm ticket={editTicketData}/>;
};

export default TicketPage;
