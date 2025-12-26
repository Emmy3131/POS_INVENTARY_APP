const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    isOpen ? (
      <div id="addProductContainer" className=" relative
          w-[95%]
          max-w-3xl
          max-h-[90vh]
          bg-white
          rounded-2xl
          shadow-xl
          flex
          flex-col
          overflow-hidden
        bg-black/50 
          bg-opacity-50 z-20">

        <div className="m-auto flex items-center justify-center">
          <div className="bg-gradient-to-br from-green-800 to-emerald-600 p-8 rounded-2xl shadow w-[700px]">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {children}
            </div>
          </div>
        </div>
      </div>

    ) : null
  )
}

export default Modal;