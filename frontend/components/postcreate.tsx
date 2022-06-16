import { useState } from 'react';
import { usePostCreate } from '../hooks/usePostCreate';

const PostCreate = () => {
      const postCreateMutation = usePostCreate();

      const [ postFiles, setPostFiles ] = useState(null);
      const [ description, setDescription ] = useState('');

      const handleFileUpload = (event: any) => {
            console.log(event.target.files);
            setPostFiles(event.target.files);
      };

      const onSubmit = async (event: any) => {
            event.preventDefault();
            console.log({postfiles: postFiles, description: description});
            postCreateMutation.mutate(new FormData(event.target), {
                        onSuccess: () => {},
                        onError: () => {console.log("Login Failed");}
                  });
      }

      return(
            <>
                  <form method="post" encType="multipart/form-data" onSubmit={onSubmit}>
                        <input
                                    onChange={({ target }) => setDescription(target.value)}
                                    value={description}
                                    aria-label="Enter your description"
                                    type="text"
                                    placeholder="Description"
                                    className=""
                                    name="description"

                              />
                        <input hidden name="type" defaultValue="image" />
                        <input type="file" name="postfiles" onChange={handleFileUpload} multiple />
                        <button
                                    disabled={postCreateMutation.isLoading}
                                    type="submit"
                                    className=""
                              >Test</button>
                  </form>
            </>
      );
}

export default PostCreate;