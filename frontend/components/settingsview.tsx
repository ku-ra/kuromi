import { useState, useEffect } from 'react';
import { useUserEdit } from '../hooks/useUserEdit';

const SettingsView = () => {
    const userEditMutation = useUserEdit();

    const [newCustomName, setNewCustomName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [isError, setIsError] = useState(false);
    
    //This needs to be fetched from backend
    const fetchedData = {customName: "TestCustomname", email: "Test@email.gov", description: "TestDescription"};
    // UseEffect to load the current values into the input, only reruns if theres an error
    useEffect(() => {
        setNewCustomName(fetchedData.customName);
        setNewEmail(fetchedData.email);
        setNewDescription(fetchedData.description);
    }, [isError]);

    // Checks if inputs changed from what they were originally, then returns the json used for the mutation
    const checkChanges = () => {
        let ret = {};
        if(newCustomName != fetchedData.customName) ret.customname = newCustomName;
        if(newEmail != fetchedData.email) ret.email = newEmail;
        if(newDescription != fetchedData.description) ret.description = newDescription;
        return(ret);
    }

    const handleUserEdit = async (event: any) => {
        event.preventDefault();
        const mutationdata = checkChanges();
        if(Object.keys(mutationdata).length !== 0){
            console.log(mutationdata);
            userEditMutation.mutate(mutationdata, {
                onSuccess: () => { console.log("Success") },
                onError: (data) => { console.log(data) },
            });
        }else{
            console.log("No data was changed");
        }
    };

    return (
            <div>
                <div>
                    <h1>MADE BY CSS-GOD JANMEY</h1>
                    <p>GET RAN BY 4WASTE RETARTED ASS MF ##NOVAGANG ( bsvo3</p>           
                </div>
                <br /><br /><br />
                {userEditMutation.isSuccess ? (
                    <h1 className="text-green-500">Change successful</h1>
                ) : null}
                {userEditMutation.isLoading && <p>Updating profile</p>}
                <div className="form">
                    <form method="POST">
                        <div className="space-y-4">
                            Custom Name
                            <input
                                disabled={userEditMutation.isLoading}
                                aria-label="New Custom Name"
                                type="text"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
                                onChange={({ target }) => setNewCustomName(target.value)}
                                value={newCustomName}
                            />
                            Email
                            <input
                                disabled={userEditMutation.isLoading}
                                aria-label="New Email"
                                type="text"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
                                onChange={({ target }) => setNewEmail(target.value)}
                                value={newEmail}
                            />
                            Description
                            <input
                                disabled={userEditMutation.isLoading}
                                aria-label="New Description"
                                type="text"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"   
                                onChange={({ target }) => setNewDescription(target.value)}
                                value={newDescription}
                            />
                            <button
                                type="submit"
                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-10 border border-blue-500 hover:border-transparent rounded"
                                onClick={(event: any) => handleUserEdit(event)}
                            >
                                Change
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default SettingsView;