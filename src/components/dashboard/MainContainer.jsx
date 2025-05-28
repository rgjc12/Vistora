export default function MainContainer({ children }) {
  return (
    <div className="min-h-[700px] h-screen overflow-h-scroll ml-[48px] min-[900px]:ml-[225px] lg:ml-[275px] transition-all duration-300">
      {children}
    </div>
  );
}
