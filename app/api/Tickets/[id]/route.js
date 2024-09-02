import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    try {
        const {id} = params
        await Ticket.findByIdAndDelete(id)
        return NextResponse.json({message: "Ticket deleted successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500})
    }
}

export async function GET(req, { params }) {
    try {
        const {id} = params
        var ticket = await Ticket.findOne({_id: id})
        return NextResponse.json({ticket}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500})
    }
}

export async function PUT(req, { params }) {
    try {
        const {id} = params
        const body = await req.json();
        const ticketData = body.formData
        console.log("ticketData",body);
        

        var ticket = await Ticket.findByIdAndUpdate(id, {...ticketData})
        return NextResponse.json({message: "Ticket Edited"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500})
    }
}