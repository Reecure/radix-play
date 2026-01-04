import EmploeeTable from "@/features/empoloeeTable/ui/emploeeTable.tsx";

const MainPage = () => {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            minHeight: 0,
            overflow: 'hidden'
        }}>
            <EmploeeTable />
        </div>
    )
};

export default MainPage;