import Photo from "../assets/photo.svg";
function Home() {
  return (
    <div className="max-w-lg mx-auto text-center ">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Bem-vindo ao Gerenciador de Produtos
      </h1>
      <p className="text-lg text-center mb-6 text-white">
        Gerencie seus produtos de forma fácil e eficiente.
      </p>
      <img
        src={Photo}
        alt="Gerenciador de Produtos"
        className="mx-auto mb-6 rounded-lg shadow-md"
      />
      <p className="text-lg text-white">
        Use o menu acima para navegar entre as páginas.
      </p>
    </div>
  );
}

export default Home;
