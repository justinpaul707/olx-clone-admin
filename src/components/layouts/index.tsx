import Header from "@app/components/layouts/header/Header";
import Footer from '@app/components/layouts/footer/Footer';

const LayoutContainer = ({ children,loginStatus }: any) => {  
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
            {children}
        </main>
        {(loginStatus && <Footer />)}
      </div>
    );
  };

export default LayoutContainer;
