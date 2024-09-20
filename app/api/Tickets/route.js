import { NextResponse } from "next/server";

const API_URL = process.env.API_URL;

export async function POST(req) {
    try {
        const body = await req.json()
        const ticketData = body.formData
        
        const apiRsp = await fetch(API_URL + "/api/tickets", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketData)
        })

        if (!apiRsp.ok) {
            throw new Error(`Failed to send data to third-party API: ${apiRsp.status}`);            
        }

        return NextResponse.json({ message: "Ticket Created" }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 })
    }
}


export async function GET() {
    try {

        const response = await fetch(API_URL + "/api/tickets", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch tickets: ${response.status}`);
        }

        const tickets = await response.json()
        return NextResponse.json({ tickets }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "Error", error }, { status: 500 })        
    }
}