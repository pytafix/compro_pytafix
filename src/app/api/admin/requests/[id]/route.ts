import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { serviceRequestAdminSchema } from '@/lib/validations';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const result = serviceRequestAdminSchema.partial().safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.issues },
        { status: 400 }
      );
    }

    const { status, technicianName, technicianNotes } = result.data;

    const existingRequest = await prisma.serviceRequest.findUnique({
      where: { id },
    });

    if (!existingRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {
      status,
      technicianName,
      technicianNotes,
    };

    if (status === 'DIAGNOSA' && !existingRequest.diagnosedAt) {
      updateData.diagnosedAt = new Date();
    } else if (status === 'DIKERJAKAN' && !existingRequest.workingAt) {
      updateData.workingAt = new Date();
    } else if (status === 'SELESAI' && !existingRequest.completedAt) {
      updateData.completedAt = new Date();
    }

    const updatedRequest = await prisma.serviceRequest.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/admin/requests');
    revalidatePath('/cek-status-servis');

    return NextResponse.json(updatedRequest, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await prisma.serviceRequest.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    await prisma.serviceRequest.delete({ where: { id } });

    revalidatePath('/admin/requests');
    revalidatePath('/cek-status-servis');

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
