export default function GroupCard({ group }) {
  return (
    <div className="card p-4">
      <h3 className="font-semibold text-slate-800">{group.name}</h3>
      <p className="text-sm text-slate-500 mt-1">
        {group.members?.length || 0} membro(s)
      </p>
    </div>
  )
}
