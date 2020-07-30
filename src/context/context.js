import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';

import axios from 'axios';

const rootUrl = 'https://api.github.com';

 //First step to create Context which gives us access to 2 components(Provider, Consumer)
const GithubContext = React.createContext();


const GithubProvider = ({children})=>{

        const [githubUser, setGitHubUser] = useState(mockUser);
        const [repos, setRepos] = useState(mockRepos);
        const [followers, setFollowers] = useState(mockFollowers);

        //request loading
        const [request, setRequest] = useState(0);
        const [isLoading, setIsLoading] = useState(false)

        //error
        const [error, setError] = useState({show:false, msg: ""})



        const searchGithubUser = async(user)=>{
            // console.log(user)
            //set toggleError to default
            toggleError();
            setIsLoading(true)
            const response = await axios(`${rootUrl}/users/${user}`).catch(err=> console.log(err))
            console.log(response)

            if(response){
                setGitHubUser(response.data);
                const {login, followers_url} = response.data
                // //logic to get repos
                // axios(`${rootUrl}/users/${login}/repos?per_page=100`).then(response=>{
                //     // console.log(response)
                //     setRepos(response.data)
                // });
                // //logic to get followers
                // axios(`${followers_url}?per_page=100`).then(response=>{
                //     // console.log(response, "response logs")
                //     setFollowers(response.data)
                // });

                const repoAxios = axios(`${rootUrl}/users/${login}/repos?per_page=100`)
                const followerAxios = axios(`${followers_url}?per_page=100`)

                //Use Promise all to fetch data 
                await Promise.allSettled([repoAxios, followerAxios]).then(results=>{
                    // console.log(results)
                    const [repos, followers] = results;
                    const status = "fulfilled";
                    if(repos.status === status){
                        setRepos(repos.value.data)
                    }
                    if(followers.status === status){
                        setFollowers(followers.value.data)
                    }
                }).catch(err=>{
                    console.err(err)
                });





            }else{
                toggleError(true, "There is no User like that username")
            }
            checkRequests();
            setIsLoading(false)

            
        }


        //check rate
        const checkRequests = ()=>{
            axios(`${rootUrl}/rate_limit`).then(({data})=>{
                // console.log(data)
                let { rate: {remaining} } = data
                // remaining = 0 test request if zeero
                setRequest(remaining)
                // console.log(request, data)
                if(remaining === 0){
                    //throw an error
                    toggleError(true, "you have exceeded your hourly rate limit")
                }   
            }).catch(err=>{
                console.error(err)
            })
        }


        function toggleError(show = false, msg = ""){
            setError({show, msg});
        }



        //error
        useEffect(checkRequests, [])






    return <GithubContext.Provider value={{
        githubUser, 
        repos,
        followers,
        request, 
        error,
        searchGithubUser,
        isLoading,
    
    }}>{children}</GithubContext.Provider>
}


export {GithubContext, GithubProvider}