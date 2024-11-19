import React from 'react'

const Login = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Iniciar sesión | <span className='text-red-950'> GranaChat</span>
        </h1>

        <form>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Nombre de usuario</span>
            </label>
            <input type="text" placeholder='Ingrese su nombre de usuario' className='w-full input input-bordered h-10'/>
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Contraseña</span>
            </label>
            <input type="password" placeholder='Ingrese su contraseña' className='w-full input input-bordered h-10'/>
          </div>

          <a href="#" className='text-sm hover:underline hover:text-red-950 mt-2 inline-block'>
            ¿No tiene una cuenta?
          </a>

          <div>
            <button className='btn btn-block btn-sm mt-2'>Ingresar</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Login
