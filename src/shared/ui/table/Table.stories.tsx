import type { Meta, StoryObj } from '@storybook/react'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table'
import { Checkbox } from '../index'
import { Button } from '../index'

const meta: Meta<typeof Table> = {
    title: 'Shared/Table',
    component: Table,
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table>

export const ComplexHeaders: Story = {
    render: () => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead rowSpan={2} style={{ width: 50 }}><Checkbox /></TableHead>
                    <TableHead rowSpan={2}>Employee</TableHead>
                    <TableHead colSpan={2} style={{ textAlign: 'center' }}>Details</TableHead>
                    <TableHead rowSpan={2} style={{ textAlign: 'right' }}>Amount</TableHead>
                </TableRow>
                <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Role</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell><Checkbox /></TableCell>
                    <TableCell>
                        <div style={{ fontWeight: 500 }}>John Doe</div>
                        <div style={{ fontSize: 12, color: '#888' }}>john@example.com</div>
                    </TableCell>
                    <TableCell>Engineering</TableCell>
                    <TableCell>Backend Dev</TableCell>
                    <TableCell style={{ textAlign: 'right', fontFamily: 'monospace' }}>$2,500.00</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><Checkbox /></TableCell>
                    <TableCell>
                        <div style={{ fontWeight: 500 }}>Jane Smith</div>
                        <div style={{ fontSize: 12, color: '#888' }}>jane@example.com</div>
                    </TableCell>
                    <TableCell>Design</TableCell>
                    <TableCell>Product Designer</TableCell>
                    <TableCell style={{ textAlign: 'right', fontFamily: 'monospace' }}>$3,100.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export const NestedRows: Story = {
    render: () => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <TableCell style={{ fontWeight: 'bold' }}>Electronics</TableCell>
                    <TableCell>Active</TableCell>
                    <TableCell><Button size="sm" variant="ghost">Edit</Button></TableCell>
                </TableRow>

                <TableRow>
                    <TableCell style={{ paddingLeft: 40 }}>Laptops</TableCell>
                    <TableCell><span style={{ color: 'green' }}>In Stock</span></TableCell>
                    <TableCell><Button size="sm" variant="ghost">Edit</Button></TableCell>
                </TableRow>

                <TableRow>
                    <TableCell style={{ paddingLeft: 40}}>Smartphones</TableCell>
                    <TableCell><span style={{ color: 'orange' }}>Low Stock</span></TableCell>
                    <TableCell style={{ width: 50 }}><Button size="sm" variant="ghost">Edit</Button></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}