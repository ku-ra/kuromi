<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ku-ra/kuromi">
    <img src="https://i.imgur.com/yCy93FH.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Kuromi</h3>

  <p align="center">
    Social Media Platform focusing on high quality image and video upload with closer interactions.
    <br />
    <br />
    <br />
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project

First personal full stack project using PostgreSQL, Express.js, React.js and Node.js. Currently unfinished.



#### Demo of current status

![](https://github.com/ku-ra/kuromi/blob/main/docs/demo.gif?raw=true)

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Next.js](https://nextjs.org/)
* [React.js](https://reactjs.org/)
* [Express.js](https://expressjs.com/)
* [TailwindCSS](https://tailwindcss.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ku-ra/kuromi
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Set-Up  `backend\src\sequelize\index.ts`
   ```js
   const sequelize = new Sequelize('POSTGRESQL CONNECTION STRING');
   ```
4. Compile and Run Back-End  `backend`
   ```sh
   npm run build
   npm run start
   ```
5. Run Front-End   `frontend`
   ```sh
   npm run dev
   ```
   
Due to lack of front-end features, you either have to add Posts & Comments through the API-Endpoints (f.e. using Postman) or just stick to the demo as it shows the majority of available features.

<p align="right">(<a href="#top">back to top</a>)</p>



## Planned Features

- [ ] Finished UI 
  - [ ] Search
  - [ ] Upload Posts
  - [ ] Add Comments
  - [ ] Like and Share
  - [ ] Display Text-Posts
  - [ ] Discover Page
  - [ ] Settings Page
- [ ] Earning and Displaying Badges (Achievements)
- [ ] Including Automated Tests (Back-End & Front-End)


Due to this project being abandoned, most feautures probably won't be implemented.

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

ku-ra - nuikex@gmail.com

Project Link: [https://github.com/ku-ra/kuromi](https://github.com/ku-ra/kuromi)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
