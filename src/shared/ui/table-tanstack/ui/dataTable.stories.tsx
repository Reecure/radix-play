import type {Meta, StoryObj} from '@storybook/react'
import {useState, useCallback} from 'react'
import type {ColumnDef, RowSelectionState, ExpandedState, PaginationState, SortingState} from '@tanstack/react-table'
import DataTable from './DataTable'
import {getActionsDropdownColumn} from "@/shared/ui/table-tanstack/ui/columns/actionColumn.tsx";

interface User {
    id: number
    name: string
    email: string
    role: string
    status: 'active' | 'inactive' | 'pending'
    department: string
    salary: number
    hireDate: string
}

interface Incident {
    id: string
    title: string
    severity: 'low' | 'medium' | 'high' | 'critical'
    status: 'open' | 'in_progress' | 'resolved'
    assignee: string
    createdAt: string
    description: string
    subIncidents?: Incident[]
}

const mockUsers: User[] = [
    {
        id: 1,
        name: 'Олександр Петренко',
        email: 'o.petrenko@example.com',
        role: 'Адміністратор',
        status: 'active',
        department: 'IT',
        salary: 85000,
        hireDate: '2021-03-15'
    },
    {
        id: 2,
        name: 'Марія Коваленко',
        email: 'm.kovalenko@example.com',
        role: 'Менеджер',
        status: 'active',
        department: 'HR',
        salary: 72000,
        hireDate: '2020-07-22'
    },
    {
        id: 3,
        name: 'Іван Шевченко',
        email: 'i.shevchenko@example.com',
        role: 'Розробник',
        status: 'pending',
        department: 'IT',
        salary: 95000,
        hireDate: '2022-01-10'
    },
    {
        id: 4,
        name: 'Анна Бондаренко',
        email: 'a.bondarenko@example.com',
        role: 'Дизайнер',
        status: 'inactive',
        department: 'Design',
        salary: 68000,
        hireDate: '2019-11-05'
    },
    {
        id: 5,
        name: 'Петро Мельник',
        email: 'p.melnyk@example.com',
        role: 'Аналітик',
        status: 'active',
        department: 'Analytics',
        salary: 78000,
        hireDate: '2021-09-18'
    },
    {
        id: 6,
        name: 'Юлія Ткаченко',
        email: 'y.tkachenko@example.com',
        role: 'Тестувальник',
        status: 'active',
        department: 'QA',
        salary: 65000,
        hireDate: '2022-04-01'
    },
    {
        id: 7,
        name: 'Дмитро Кравченко',
        email: 'd.kravchenko@example.com',
        role: 'DevOps',
        status: 'active',
        department: 'IT',
        salary: 92000,
        hireDate: '2020-02-14'
    },
    {
        id: 8,
        name: 'Ольга Савченко',
        email: 'o.savchenko@example.com',
        role: 'PM',
        status: 'pending',
        department: 'Management',
        salary: 88000,
        hireDate: '2021-06-30'
    },
]

const mockIncidents: Incident[] = [
    {
        id: 'INC-001',
        title: 'Аварія на трансформаторній підстанції',
        severity: 'critical',
        status: 'in_progress',
        assignee: 'Бригада №3',
        createdAt: '2024-01-15 08:30',
        description: 'Пошкодження трансформатора внаслідок перенавантаження. Знеструмлено 500 споживачів.',
        subIncidents: [
            {
                id: 'INC-001-A',
                title: 'Заміна запобіжників',
                severity: 'high',
                status: 'resolved',
                assignee: 'Техніків А. П.',
                createdAt: '2024-01-15 09:00',
                description: 'Виконано заміну пошкоджених запобіжників',
                subIncidents: [{
                    id: 'INC-01111-A',
                    title: 'Заміна запобіжників 2',
                    severity: 'high',
                    status: 'resolved',
                    assignee: 'Техніків А. П.',
                    createdAt: '2024-01-15 09:00',
                    description: 'Виконано заміну пошкоджених запобіжників',
                }],
            },
            {
                id: 'INC-001-B',
                title: 'Тестування лінії',
                severity: 'medium',
                status: 'open',
                assignee: 'Бригада №3',
                createdAt: '2024-01-15 10:30',
                description: 'Необхідно провести діагностику лінії',
            },
        ],
    },
    {
        id: 'INC-002',
        title: 'Пошкодження газопроводу',
        severity: 'high',
        status: 'open',
        assignee: 'Аварійна служба',
        createdAt: '2024-01-15 10:15',
        description: 'Виявлено витік газу на перехресті вул. Центральна та пр. Миру.',
    },
    {
        id: 'INC-003',
        title: 'Збій у роботі світлофора',
        severity: 'medium',
        status: 'resolved',
        assignee: 'Служба руху',
        createdAt: '2024-01-14 16:45',
        description: 'Світлофор на перехресті не працює в автоматичному режимі.',
    },
    {
        id: 'INC-004',
        title: 'Затоплення підвалу',
        severity: 'low',
        status: 'in_progress',
        assignee: 'ЖЕК №12',
        createdAt: '2024-01-14 14:20',
        description: 'Рівень води в підвалі житлового будинку досяг 20 см.',
    },
]

const baseUserColumns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Імʼя',
        size: 200,
    },
    {
        accessorKey: 'email',
        header: 'Email',
        size: 250,
    },
    {
        accessorKey: 'role',
        header: 'Роль',
        size: 150,
    },
    {
        accessorKey: 'status',
        header: 'Статус',
        size: 120,
        cell: ({getValue}) => {
            const status = getValue() as User['status']
            const variants: Record<User['status'], { label: string; variant: string }> = {
                active: {label: 'Активний', variant: 'success'},
                inactive: {label: 'Неактивний', variant: 'secondary'},
                pending: {label: 'Очікує', variant: 'warning'},
            }
            return <div>{variants[status].label}</div>
        },
    },
    {
        accessorKey: 'department',
        header: 'Відділ',
        size: 150,
    },
]

const incidentColumns: ColumnDef<Incident>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
        size: 120,
    },
    {
        accessorKey: 'title',
        header: 'Назва',
        size: 300,
    },
    {
        accessorKey: 'severity',
        header: 'Критичність',
        size: 130,
        cell: ({getValue}) => {
            const severity = getValue() as Incident['severity']
            const variants: Record<Incident['severity'], { label: string; color: string }> = {
                low: {label: 'Низька', color: '#22c55e'},
                medium: {label: 'Середня', color: '#eab308'},
                high: {label: 'Висока', color: '#f97316'},
                critical: {label: 'Критична', color: '#ef4444'},
            }
            return (
                <span style={{color: variants[severity].color, fontWeight: 600}}>
                    {variants[severity].label}
                </span>
            )
        },
    },
    {
        accessorKey: 'status',
        header: 'Статус',
        size: 140,
        cell: ({getValue}) => {
            const status = getValue() as Incident['status']
            const labels: Record<Incident['status'], string> = {
                open: 'Відкритий',
                in_progress: 'В роботі',
                resolved: 'Вирішено',
            }
            return labels[status]
        },
    },
    {
        accessorKey: 'assignee',
        header: 'Виконавець',
        size: 180,
    },
    {
        accessorKey: 'createdAt',
        header: 'Створено',
        size: 160,
    },
]

const meta: Meta<typeof DataTable> = {
    title: 'Shared/DataTable',
    component: DataTable,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
Універсальний компонент таблиці на базі TanStack Table з підтримкою:

- **Вибір рядків** — одиночний та множинний вибір з чекбоксами
- **Розкриття рядків** — вкладений контент або ієрархічні дані
- **Пагінація** — серверна пагінація з контролем стану
- **Сортування** — серверне сортування з індикаторами
- **Зміна розміру колонок** — drag-and-drop ресайз
- **Дії над рядками** — dropdown меню з кастомними діями
- **Фільтри** — розгортувані фільтри в заголовку
- **Стилізація рядків** — умовні класи та стилі

## Імпорт

\`\`\`tsx
import DataTable from '@/shared/ui/table-tanstack'
import { getSelectionColumn, getExpandColumn, getActionsDropdownColumn } from '@/shared/ui/table-tanstack/columns'
\`\`\`
                `,
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DataTable<User>>


export const Basic: Story = {
    render: () => (
        <DataTable
            data={mockUsers}
            columns={baseUserColumns}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: `
Базове використання таблиці. Потрібно передати лише \`data\` та \`columns\`.

\`\`\`tsx
const columns: ColumnDef<User>[] = [
    { accessorKey: 'name', header: 'Імʼя', size: 200 },
    { accessorKey: 'email', header: 'Email', size: 250 },
    { accessorKey: 'role', header: 'Роль', size: 150 },
]

<DataTable data={users} columns={columns} />
\`\`\`
                `,
            },
        },
    },
}


export const WithSelection: Story = {
    render: () => {
        const SelectionExample = () => {
            const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

            const selectedUsers = Object.keys(rowSelection)
                .filter(key => rowSelection[key])
                .map(key => mockUsers[parseInt(key)])

            return (
                <div>
                    <div style={{marginBottom: 16}}>
                        <strong>Вибрано: </strong>
                        {selectedUsers.length > 0
                            ? selectedUsers.map(u => u.name).join(', ')
                            : 'нічого'}
                    </div>
                    <DataTable
                        data={mockUsers}
                        columns={baseUserColumns}
                        selection={{enabled: true}}
                        rowSelection={rowSelection}
                        onRowSelectionChange={setRowSelection}
                    />
                </div>
            )
        }
        return <SelectionExample/>
    },
    parameters: {
        docs: {
            description: {
                story: `
Таблиця з можливістю вибору рядків. Колонка з чекбоксами додається автоматично.

\`\`\`tsx
const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

<DataTable
    data={users}
    columns={columns}
    selection={{ enabled: true }}
    rowSelection={rowSelection}
    onRowSelectionChange={setRowSelection}
/>

// Отримання вибраних рядків
const selectedIds = Object.keys(rowSelection).filter(k => rowSelection[k])
\`\`\`
                `,
            },
        },
    },
}


export const WithConditionalSelection: Story = {
    render: () => {
        const ConditionalSelectionExample = () => {
            const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

            return (
                <div>
                    <DataTable
                        data={mockUsers}
                        columns={baseUserColumns}
                        selection={{
                            enabled: true,
                            enableRowSelection: (row) => row.status === 'active',
                        }}
                        rowSelection={rowSelection}
                        onRowSelectionChange={setRowSelection}
                    />
                </div>
            )
        }
        return <ConditionalSelectionExample/>
    },
    parameters: {
        docs: {
            description: {
                story: `
Умовний вибір — деякі рядки можна заборонити для вибору.

\`\`\`tsx
<DataTable
    selection={{
        enabled: true,
        enableRowSelection: (row) => row.status === 'active',
    }}
/>
\`\`\`
                `,
            },
        },
    },
}


export const WithExpandedContent: Story = {
    render: () => {
        const ExpandedContentExample = () => {
            const [expanded, setExpanded] = useState<ExpandedState>({})

            return (
                <DataTable
                    data={mockIncidents.slice(0, 4)}
                    columns={incidentColumns}
                    expand={{
                        enabled: true,
                        expandMode: 'content',
                        renderExpandedContent: (incident) => (
                            <div style={{padding: '16px 24px'}}>
                                <h4 style={{margin: '0 0 8px'}}>Опис інциденту</h4>
                                <p style={{margin: 0, color: '#64748b'}}>{incident.description}</p>
                            </div>
                        ),
                    }}
                    expandedState={expanded}
                    onExpandedChange={setExpanded}
                />
            )
        }
        return <ExpandedContentExample/>
    },
    parameters: {
        docs: {
            description: {
                story: `
Розкриття рядка з кастомним контентом. Використовується для показу детальної інформації.

\`\`\`tsx
<DataTable
    expand={{
        enabled: true,
        expandMode: 'content',
        renderExpandedContent: (row) => (
            <div>
                <h4>Деталі</h4>
                <p>{row.description}</p>
            </div>
        ),
    }}
    expandedState={expanded}
    onExpandedChange={setExpanded}
/>
\`\`\`
                `,
            },
        },
    },
}


export const WithHierarchicalData: Story = {
    render: () => {
        const HierarchicalExample = () => {
            const [expanded, setExpanded] = useState<ExpandedState>({'INC-001': true})

            return (
                <DataTable
                    data={mockIncidents}
                    columns={incidentColumns}
                    expand={{
                        enabled: true,
                        expandMode: 'subrows',
                        getSubRows: (row) => row.subIncidents,
                        defaultExpanded: {0: true},
                    }}
                    expandedState={expanded}
                    onExpandedChange={setExpanded}
                />
            )
        }
        return <HierarchicalExample/>
    },
    parameters: {
        docs: {
            description: {
                story: `
Ієрархічні дані з вкладеними рядками. Підходить для деревоподібних структур.

\`\`\`tsx
interface Incident {
    id: string
    title: string
    subIncidents?: Incident[]
}

<DataTable
    expand={{
        enabled: true,
        expandMode: 'subrows',
        getSubRows: (row) => row.subIncidents,
        defaultExpanded: { 0: true },
    }}
/>
\`\`\`

Вкладені рядки автоматично отримують відступ зліва пропорційно глибині вкладеності.
                `,
            },
        },
    },
}


export const WithPagination: Story = {
    render: () => {
        const PaginationExample = () => {
            const [pagination, setPagination] = useState<PaginationState>({
                pageIndex: 0,
                pageSize: 3,
            })

            const paginatedData = mockUsers.slice(
                pagination.pageIndex * pagination.pageSize,
                (pagination.pageIndex + 1) * pagination.pageSize
            )

            return (
                <DataTable
                    data={paginatedData}
                    columns={baseUserColumns}
                    pagination={pagination}
                    onPaginationChange={setPagination}
                    totalRows={mockUsers.length}
                />
            )
        }
        return <PaginationExample/>
    },
    parameters: {
        docs: {
            description: {
                story: `
Серверна пагінація з контрольованим станом. Компонент Paginator додається автоматично.

\`\`\`tsx
const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
})

// Запит на сервер
const { data, total } = await fetchUsers({
    page: pagination.pageIndex,
    limit: pagination.pageSize,
})

<DataTable
    data={data}
    columns={columns}
    pagination={pagination}
    onPaginationChange={setPagination}
    totalRows={total}
/>
\`\`\`
                `,
            },
        },
    },
}


export const WithSorting: Story = {
    render: () => {
        const SortingExample = () => {
            const [sorting, setSorting] = useState<SortingState>([])
            const [data, setData] = useState(mockUsers)

            const handleSortingChange = useCallback((updater: any) => {
                const newSorting = typeof updater === 'function' ? updater(sorting) : updater
                setSorting(newSorting)

                if (newSorting.length > 0) {
                    const {id, desc} = newSorting[0]
                    const sorted = [...mockUsers].sort((a, b) => {
                        const aVal = a[id as keyof User]
                        const bVal = b[id as keyof User]
                        if (aVal < bVal) return desc ? 1 : -1
                        if (aVal > bVal) return desc ? -1 : 1
                        return 0
                    })
                    setData(sorted)
                } else {
                    setData(mockUsers)
                }
            }, [sorting])

            const sortableColumns: ColumnDef<User>[] = baseUserColumns.map(col => ({
                ...col,
                enableSorting: true,
            }))

            return (
                <div>
                    <div style={{marginBottom: 16}}>
                        <strong>Сортування: </strong>
                        {sorting.length > 0
                            ? `${sorting[0].id} (${sorting[0].desc ? 'desc' : 'asc'})`
                            : 'немає'}
                    </div>
                    <DataTable
                        data={data}
                        columns={sortableColumns}
                        sorting={sorting}
                        onSortingChange={handleSortingChange}
                    />
                </div>
            )
        }
        return <SortingExample/>
    },
    parameters: {
        docs: {
            description: {
                story: `
Серверне сортування. Клік по заголовку змінює напрямок сортування.

\`\`\`tsx
const [sorting, setSorting] = useState<SortingState>([])

const columns: ColumnDef<User>[] = [
    { accessorKey: 'name', header: 'Імʼя', enableSorting: true },
    { accessorKey: 'email', header: 'Email', enableSorting: true },
]

// Запит на сервер з параметрами сортування
const { data } = await fetchUsers({
    sortBy: sorting[0]?.id,
    sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
})

<DataTable
    data={data}
    columns={columns}
    sorting={sorting}
    onSortingChange={setSorting}
/>
\`\`\`
                `,
            },
        },
    },
}


export const WithActions: Story = {
    render: () => {
        const ActionsExample = () => {
            const columnsWithActions: ColumnDef<User>[] = [
                ...baseUserColumns,
                getActionsDropdownColumn<User>((row) => [
                    {
                        label: 'Переглянути',
                        onClick: (user) => alert(`Перегляд: ${user.name}`),
                    },
                    {
                        label: 'Редагувати',
                        onClick: (user) => alert(`Редагування: ${user.name}`),
                    },
                    {
                        label: 'Деактивувати',
                        disabled: row.status === 'inactive',
                        onClick: (user) => alert(`Деактивація: ${user.name}`),
                    },
                    {
                        label: 'Видалити',
                        canShow: row.status !== 'active',
                        onClick: (user) => alert(`Видалення: ${user.name}`),
                    },
                ]),
            ]

            return (
                <DataTable
                    data={mockUsers}
                    columns={columnsWithActions}
                />
            )
        }
        return <ActionsExample/>
    },
    parameters: {
        docs: {
            description: {
                story: `
Колонка з dropdown меню дій. Підтримує умовне відображення та блокування дій.

\`\`\`tsx
import { getActionsDropdownColumn } from '@/shared/ui/table-tanstack/columns'

const columns: ColumnDef<User>[] = [
    ...baseColumns,
    getActionsDropdownColumn<User>((row) => [
        {
            label: 'Переглянути',
            onClick: (user) => navigate(\`/users/\${user.id}\`),
        },
        {
            label: 'Редагувати',
            onClick: (user) => openEditModal(user),
        },
        {
            label: 'Деактивувати',
            disabled: row.status === 'inactive',
            onClick: (user) => deactivateUser(user.id),
        },
        {
            label: 'Видалити',
            canShow: hasDeletePermission,
            onClick: (user) => deleteUser(user.id),
        },
    ]),
]
\`\`\`

**ActionConfig:**
- \`label\` — текст пункту меню
- \`icon\` — іконка (опціонально)
- \`disabled\` — заблокувати пункт
- \`canShow\` — умова відображення пункту
- \`onClick\` — обробник кліку
                `,
            },
        },
    },
}


export const WithRowConfig: Story = {
    render: () => {
        const RowConfigExample = () => {
            const [hoveredUser, setHoveredUser] = useState<User | null>(null)

            return (
                <div>
                    <div style={{marginBottom: 16}}>
                        <strong>Hover: </strong>
                        {hoveredUser ? hoveredUser.name : 'немає'}
                    </div>
                    <DataTable
                        data={mockUsers}
                        columns={baseUserColumns}
                        rowConfig={{
                            onClick: (user) => alert(`Клік: ${user.name}`),
                            onDoubleClick: (user) => alert(`Подвійний клік: ${user.name}`),
                            onHover: (user) => setHoveredUser(user),
                            isRowDisabled: (user) => user.status === 'inactive',
                            getRowClassName: (user) => user.status === 'pending' ? 'pending-row' : '',
                            getRowStyle: (user) => ({
                                backgroundColor: user.status === 'active' ? 'rgba(34, 197, 94, 0.05)' : undefined,
                            }),
                        }}
                    />
                </div>
            )
        }
        return <RowConfigExample/>
    },
    parameters: {
        docs: {
            description: {
                story: `
Конфігурація поведінки та стилів рядків.

\`\`\`tsx
<DataTable
    rowConfig={{
        onClick: (row, index) => selectRow(row),
        onDoubleClick: (row, index) => openDetails(row),
        onHover: (row, index) => setHighlighted(row),
        isRowDisabled: (row) => row.status === 'inactive',
        getRowClassName: (row, index) => row.isPriority ? 'priority' : '',
        getRowStyle: (row, index) => ({
            backgroundColor: row.isNew ? '#eff6ff' : undefined,
        }),
    }}
/>
\`\`\`

**RowConfig:**
- \`onClick\` — клік по рядку
- \`onDoubleClick\` — подвійний клік
- \`onHover\` — наведення миші (null при виході)
- \`isRowDisabled\` — заблокувати рядок (без кліків)
- \`getRowClassName\` — кастомний CSS клас
- \`getRowStyle\` — inline стилі
                `,
            },
        },
    },
}


export const WithResizing: Story = {
    render: () => (
        <DataTable
            data={mockUsers}
            columns={baseUserColumns}
            enableResizing
            columnResizeMode="onChange"
        />
    ),
    parameters: {
        docs: {
            description: {
                story: `
Зміна ширини колонок перетягуванням. Подвійний клік скидає до початкового розміру.

\`\`\`tsx
<DataTable
    enableResizing
    columnResizeMode="onChange"
/>
\`\`\`

**columnResizeMode:**
- \`'onChange'\` — плавна зміна під час перетягування
- \`'onEnd'\` — зміна після завершення перетягування
                `,
            },
        },
    },
}


export const WithFilters: Story = {
    render: () => {
        const FilterExample = () => {
            const filterableColumns: ColumnDef<User>[] = [
                {
                    accessorKey: 'name',
                    header: 'Імʼя',
                    size: 200,
                    meta: {filterVariant: 'text'},
                },
                {
                    accessorKey: 'email',
                    header: 'Email',
                    size: 250,
                    meta: {filterVariant: 'text'},
                },
                {
                    accessorKey: 'role',
                    header: 'Роль',
                    size: 150,
                },
                {
                    accessorKey: 'department',
                    header: 'Відділ',
                    size: 150,
                    meta: {filterVariant: 'text'},
                },
            ]

            return (
                <DataTable
                    data={mockUsers}
                    columns={filterableColumns}
                    isFilterExpanded
                />
            )
        }
        return <FilterExample/>
    },
    parameters: {
        docs: {
            description: {
                story: `
Розгортувані фільтри в заголовку таблиці.

\`\`\`tsx
const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Імʼя',
        meta: { filterVariant: 'text' },
    },
    {
        accessorKey: 'department',
        header: 'Відділ',
        meta: { filterVariant: 'select' },
    },
]

<DataTable
    columns={columns}
    isFilterExpanded={isFilterOpen}
/>
\`\`\`

**filterVariant:**
- \`'text'\` — текстовий пошук
- \`'select'\` — вибір зі списку
- \`'range'\` — діапазон значень
- \`'calendar'\` — вибір дати
                `,
            },
        },
    },
}


export const WithLoadingState: Story = {
    render: () => (
        <DataTable
            data={[]}
            columns={baseUserColumns}
            isLoading
            loadingRows={5}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: `
Стан завантаження з skeleton-рядками.

\`\`\`tsx
const { data, isLoading } = useQuery(...)

<DataTable
    data={data ?? []}
    columns={columns}
    isLoading={isLoading}
    loadingRows={10}
/>
\`\`\`
                `,
            },
        },
    },
}


export const WithEmptyState: Story = {
    render: () => (
        <DataTable
            data={[]}
            columns={baseUserColumns}
            emptyState={
                <div style={{padding: 40, textAlign: 'center', color: '#94a3b8'}}>
                    <div style={{fontSize: 48, marginBottom: 16}}>📭</div>
                    <div style={{fontSize: 18, fontWeight: 500, marginBottom: 8}}>
                        Даних не знайдено
                    </div>
                    <div style={{fontSize: 14}}>
                        Спробуйте змінити параметри фільтрації
                    </div>
                </div>
            }
        />
    ),
    parameters: {
        docs: {
            description: {
                story: `
Кастомний стан для порожньої таблиці.

\`\`\`tsx
<DataTable
    data={[]}
    columns={columns}
    emptyState={
        <EmptyState
            icon={<SearchIcon />}
            title="Нічого не знайдено"
            description="Спробуйте змінити фільтри"
            action={<Button onClick={resetFilters}>Скинути</Button>}
        />
    }
/>
\`\`\`
                `,
            },
        },
    },
}


export const WithStickyColumns: Story = {
    render: () => {
        const columnsWithSticky: ColumnDef<User>[] = [
            {
                accessorKey: 'name',
                header: 'Імʼя',
                size: 200,
                meta: {sticky: 'left'},
            },
            {accessorKey: 'email', header: 'Email', size: 250},
            {accessorKey: 'role', header: 'Роль', size: 150},
            {accessorKey: 'status', header: 'Статус', size: 120},
            {accessorKey: 'department', header: 'Відділ', size: 150},
            {
                accessorKey: 'salary',
                header: 'Зарплата',
                size: 120,
                cell: ({getValue}) => `$${(getValue() as number).toLocaleString()}`,
            },
            {accessorKey: 'hireDate', header: 'Дата найму', size: 140},
            getActionsDropdownColumn<User>(() => [
                {
                    label: 'Переглянути', onClick: () => {
                    }
                },
                {
                    label: 'Редагувати', onClick: () => {
                    }
                },
            ]),
        ]

        return (
            <div style={{maxWidth: 800, overflow: 'auto'}}>
                <DataTable
                    data={mockUsers}
                    columns={columnsWithSticky}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Закріплені колонки при горизонтальному скролі.

\`\`\`tsx
const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'name',
        header: 'Імʼя',
        meta: { sticky: 'left' },
    },
    // ... інші колонки
    {
        id: 'actions',
        meta: { sticky: 'right' },
        // ...
    },
]
\`\`\`
                `,
            },
        },
    },
}


export const FullFeatured: Story = {
    render: () => {
        const FullFeaturedExample = () => {
            const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
            const [expanded, setExpanded] = useState<ExpandedState>({})
            const [pagination, setPagination] = useState<PaginationState>({pageIndex: 0, pageSize: 5})
            const [sorting, setSorting] = useState<SortingState>([])

            const columnsWithAll: ColumnDef<Incident>[] = [
                ...incidentColumns.map(col => ({...col, enableSorting: true})),
                getActionsDropdownColumn<Incident>((row) => [
                    {label: 'Деталі', onClick: (inc) => alert(`Деталі: ${inc.id}`)},
                    {label: 'Призначити', onClick: (inc) => alert(`Призначити: ${inc.id}`)},
                    {
                        label: 'Закрити',
                        disabled: row.status === 'resolved',
                        onClick: (inc) => alert(`Закрити: ${inc.id}`)
                    },
                ]),
            ]

            const paginatedData = mockIncidents.slice(
                pagination.pageIndex * pagination.pageSize,
                (pagination.pageIndex + 1) * pagination.pageSize
            )

            return (
                <div>
                    <div style={{marginBottom: 16, display: 'flex', gap: 16}}>
                        <span><strong>Вибрано:</strong> {Object.keys(rowSelection).filter(k => rowSelection[k]).length}</span>
                        <span><strong>Розгорнуто:</strong> {Object.keys(expanded).filter(k => expanded[k as keyof typeof expanded]).length}</span>
                    </div>
                    <DataTable
                        data={paginatedData}
                        columns={columnsWithAll}
                        selection={{enabled: true}}
                        rowSelection={rowSelection}
                        onRowSelectionChange={setRowSelection}
                        expand={{
                            enabled: true,
                            expandMode: 'both',
                            getSubRows: (row) => row.subIncidents,
                            renderExpandedContent: (incident) => (
                                <div style={{padding: 16, background: '#f1f5f9'}}>
                                    <strong>Опис:</strong> {incident.description}
                                </div>
                            ),
                        }}
                        expandedState={expanded}
                        onExpandedChange={setExpanded}
                        pagination={pagination}
                        onPaginationChange={setPagination}
                        totalRows={mockIncidents.length}
                        sorting={sorting}
                        onSortingChange={setSorting}
                        rowConfig={{
                            onClick: (inc) => console.log('Click:', inc.id),
                            getRowStyle: (inc) => ({
                                borderLeft: inc.severity === 'critical' ? '3px solid #ef4444' : undefined,
                            }),
                        }}
                        enableResizing
                        headerGap={8}
                    />
                </div>
            )
        }
        return <FullFeaturedExample/>
    },
    parameters: {
        docs: {
            description: {
                story: `
Приклад з усіма можливостями: вибір, розкриття, пагінація, сортування, дії, стилізація.

Це демонструє як різні функції працюють разом у реальному сценарії управління інцидентами.
                `,
            },
        },
    },
}

export const WithNestedHeaders: Story = {
    render: () => {
        interface Employee {
            id: number
            name: string
            position: string
            salary: number
            bonus: number
            email: string
            phone: string
        }

        const employees: Employee[] = [
            { id: 1, name: 'Олександр Петренко', position: 'Developer', salary: 95000, bonus: 15000, email: 'o.petrenko@company.com', phone: '+380 67 123 4567' },
            { id: 2, name: 'Марія Коваленко', position: 'Designer', salary: 88000, bonus: 12000, email: 'm.kovalenko@company.com', phone: '+380 50 234 5678' },
            { id: 3, name: 'Іван Шевченко', position: 'Manager', salary: 72000, bonus: 8000, email: 'i.shevchenko@company.com', phone: '+380 63 345 6789' },
        ]

        const nestedColumns: ColumnDef<Employee>[] = [
            {
                id: 'info',
                header: 'Співробітник',
                columns: [
                    { accessorKey: 'name', header: 'ПІБ', size: 200 },
                    { accessorKey: 'position', header: 'Посада', size: 140 },
                ],
            },
            {
                id: 'compensation',
                header: 'Компенсація',
                columns: [
                    {
                        accessorKey: 'salary',
                        header: 'Оклад',
                        size: 110,
                        cell: ({ getValue }) => `$${(getValue() as number).toLocaleString()}`,
                    },
                    {
                        accessorKey: 'bonus',
                        header: 'Бонус',
                        size: 100,
                        cell: ({ getValue }) => `$${(getValue() as number).toLocaleString()}`,
                    },
                ],
            },
            {
                id: 'contacts',
                header: 'Контакти',
                columns: [
                    { accessorKey: 'email', header: 'Email', size: 220 },
                    { accessorKey: 'phone', header: 'Телефон', size: 160 },
                ],
            },
        ]

        return <DataTable data={employees} columns={nestedColumns} />
    },
    parameters: {
        docs: {
            description: {
                story: `
Вкладені заголовки дозволяють групувати колонки.

\`\`\`tsx
const columns: ColumnDef<Employee>[] = [
    {
        id: 'info',
        header: 'Співробітник',
        columns: [
            { accessorKey: 'name', header: 'ПІБ' },
            { accessorKey: 'position', header: 'Посада' },
        ],
    },
    {
        id: 'compensation',
        header: 'Компенсація',
        columns: [
            { accessorKey: 'salary', header: 'Оклад' },
            { accessorKey: 'bonus', header: 'Бонус' },
        ],
    },
]
\`\`\`
                `,
            },
        },
    },
}


export const WithDeepNestedHeaders: Story = {
    render: () => {
        interface QuarterData {
            id: number
            company: string
            q1Revenue: number
            q1Profit: number
            q2Revenue: number
            q2Profit: number
        }

        const data: QuarterData[] = [
            { id: 1, company: 'ТехноПром', q1Revenue: 1200, q1Profit: 400, q2Revenue: 1350, q2Profit: 500 },
            { id: 2, company: 'АгроСвіт', q1Revenue: 800, q1Profit: 200, q2Revenue: 950, q2Profit: 300 },
        ]

        const columns: ColumnDef<QuarterData>[] = [
            { accessorKey: 'company', header: 'Компанія', size: 140 },
            {
                id: 'financials',
                header: 'Фінанси 2024',
                columns: [
                    {
                        id: 'q1',
                        header: 'Q1',
                        columns: [
                            { accessorKey: 'q1Revenue', header: 'Дохід', size: 90 },
                            { accessorKey: 'q1Profit', header: 'Прибуток', size: 90 },
                        ],
                    },
                    {
                        id: 'q2',
                        header: 'Q2',
                        columns: [
                            { accessorKey: 'q2Revenue', header: 'Дохід', size: 90 },
                            { accessorKey: 'q2Profit', header: 'Прибуток', size: 90 },
                        ],
                    },
                ],
            },
        ]

        return <DataTable data={data} columns={columns} />
    },
    parameters: {
        docs: {
            description: {
                story: `
Глибока вкладеність (3 рівні): Фінанси 2024 → Q1/Q2 → Дохід/Прибуток.

\`\`\`tsx
const columns: ColumnDef<Data>[] = [
    {
        id: 'financials',
        header: 'Фінанси 2024',
        columns: [
            {
                id: 'q1',
                header: 'Q1',
                columns: [
                    { accessorKey: 'q1Revenue', header: 'Дохід' },
                    { accessorKey: 'q1Profit', header: 'Прибуток' },
                ],
            },
            {
                id: 'q2',
                header: 'Q2',
                columns: [
                    { accessorKey: 'q2Revenue', header: 'Дохід' },
                    { accessorKey: 'q2Profit', header: 'Прибуток' },
                ],
            },
        ],
    },
]
\`\`\`
                `,
            },
        },
    },
}

export const TypesReference: Story = {
    render: () => (
        <div style={{padding: 24, fontFamily: 'monospace', fontSize: 14, lineHeight: 1.8}}>
            <h3>DataTableProps&lt;T&gt;</h3>
            <pre style={{background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflow: 'auto'}}>
{`interface DataTableProps<T> {
    // Обовʼязкові
    data: T[]
    columns: ColumnDef<T>[]

    // Вибір
    selection?: SelectionConfig<T>
    rowSelection?: RowSelectionState
    onRowSelectionChange?: OnChangeFn<RowSelectionState>

    // Розкриття
    expand?: ExpandConfig<T>
    expandedState?: ExpandedState
    onExpandedChange?: OnChangeFn<ExpandedState>

    // Пагінація
    pagination?: PaginationState
    onPaginationChange?: OnChangeFn<PaginationState>
    totalRows?: number

    // Сортування
    sorting?: SortingState
    onSortingChange?: OnChangeFn<SortingState>

    // Рядки
    rowConfig?: RowConfig<T>

    // UI
    enableResizing?: boolean
    columnResizeMode?: 'onChange' | 'onEnd'
    isFilterExpanded?: boolean
    emptyState?: ReactNode
    isLoading?: boolean
    loadingRows?: number
    headerGap?: number
    className?: string
    wrapperClassName?: string
}`}
            </pre>

            <h3 style={{marginTop: 24}}>SelectionConfig&lt;T&gt;</h3>
            <pre style={{background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflow: 'auto'}}>
{`interface SelectionConfig<T> {
    enabled: boolean
    enableRowSelection?: (row: T) => boolean
}`}
            </pre>

            <h3 style={{marginTop: 24}}>ExpandConfig&lt;T&gt;</h3>
            <pre style={{background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflow: 'auto'}}>
{`interface ExpandConfig<T> {
    enabled: boolean
    expandMode?: 'content' | 'subrows' | 'both'
    getSubRows?: (row: T) => T[] | undefined
    renderExpandedContent?: (row: T) => ReactNode
    canExpand?: (row: T) => boolean
    defaultExpanded?: boolean | Record<string, boolean>
}`}
            </pre>

            <h3 style={{marginTop: 24}}>RowConfig&lt;T&gt;</h3>
            <pre style={{background: '#1e293b', color: '#e2e8f0', padding: 16, borderRadius: 8, overflow: 'auto'}}>
{`interface RowConfig<T> {
    onClick?: (row: T, index: number) => void
    onDoubleClick?: (row: T, index: number) => void
    onHover?: (row: T | null, index: number | null) => void
    isRowDisabled?: (row: T) => boolean
    getRowClassName?: (row: T, index: number) => string
    getRowStyle?: (row: T, index: number) => CSSProperties
}`}
            </pre>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Довідник по всіх типах компонента DataTable.',
            },
        },
    },
}
