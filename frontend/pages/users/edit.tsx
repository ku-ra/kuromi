import Header from '../../components/header';
import SettingsView from '../../components/settingsview';


export default function Edit() {
    return (
      <>
        <Header></Header>
        <div className="min-h-full max-w-full mx-auto grid grid-cols-3">
          <div className="col-span-1 h-screen hidden md:block"></div>
            <div className="flex h-screen">
              <div className="m-auto">
                <SettingsView></SettingsView>
              </div>
            </div>
        </div>
      </>
    )
  }