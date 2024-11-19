const GenderCheckbox = () => {
  return (
    <div className="flex">
        <div className="from-control">
            <label className={`label gap-2 cursor-pointer`}>
 				<span className='label-text'>Hombre</span>
 				<input type='checkbox' className='checkbox border-slate-900' />
 			</label>
        </div>
        <div className="from-control">
            <label className={`label gap-2 cursor-pointer`}>
 				<span className='label-text'>Mujer</span>
 				<input type='checkbox' className='checkbox border-slate-900' />
 			</label>
        </div>
    </div>
  )
}

export default GenderCheckbox