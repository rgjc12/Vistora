import { Bell } from "lucide-react"

const PageHeader = ({ title }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-bold">{title}</h1>
      <Bell size={20} className="cursor-pointer" />
    </div>
  )
}

export default PageHeader
