import { useEffect, useState } from "react";
import { useGetQuery, usePostMutation } from "shared/api";
import { getMaintenanceUri } from "shared/constants";

const Maintenance = () => {
  const { data } = useGetQuery({ url: getMaintenanceUri })
  const [save] = usePostMutation()
  const [value, setValue] = useState<number>(2)
  const [off, setOff] = useState(false)
  const isMaintenance = data?.result?.off

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  }

  const handleSubmit = async (wait: number) => {
    const data = await save({
        url: getMaintenanceUri,
        body: { wait }
      }).unwrap()

    const isOff = data?.result?.off
    setOff(isOff)
  }

  useEffect(() => {
    setOff(isMaintenance)
  }, [data])

  if (off) {
    return (
      <button
        className="btn btn-primary"
        onClick={() => handleSubmit(0)}
      >
        Maintenanse turn off
      </button>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-base-100 rounded-2xl shadow-xl w-full max-w-md mx-auto border border-base-200">
      <input
        type="range"
        min="1"
        max="24"
        step="1"
        value={value}
        onChange={handleChange}
        className="range range-primary range-sm transition-all duration-150 w-full"
      />
      <div className="flex w-full justify-between px-2 text-xs mt-2 text-base-content/40 select-none">
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <span>|</span>
      </div>
      <div className="flex w-full justify-between px-1 text-xs text-base-content/60 font-medium select-none">
        <span className="w-4 text-left">1</span>
        <span className="w-4 text-center">6</span>
        <span className="w-4 text-center">12</span>
        <span className="w-4 text-center">18</span>
        <span className="w-4 text-right">24</span>
      </div>
      <button
        className="btn btn-primary mt-4"
        onClick={() => handleSubmit(value)}
      >
          Maintenanse turn on {value} hours
      </button>

    </div>
  );
}

export default Maintenance
