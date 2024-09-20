import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function DELETE(req, { params }) {
    try {
        const {id} = params

        const response = await fetch(`${API_URL}/api/tickets/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        if (!response.ok) {
            throw new Error(`Failed to delete ticket: ${response.status}`);
        }

        return NextResponse.json({message: "Ticket deleted successfully"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500})
    }
}

export async function GET(req, { params }) {
    try {
        const {id} = params
        
        const response = await fetch(`${API_URL}/api/tickets/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        if (!response.ok) {
            throw new Error(`Failed to delete ticket: ${response.status}`);
        }
        var ticket = await response.json()

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
        
        const response = await fetch(`${API_URL}/api/tickets/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticketData)
        })
        
        if (!response.ok) {
            throw new Error(`Failed to delete ticket: ${response.status}`);
        }

        return NextResponse.json({message: "Ticket Edited"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Error", error}, {status: 500})
    }
}