import React, { useEffect, useRef } from 'react';

const Error = () => {
  const wordsearchRef = useRef(null);

  useEffect(() => {
    const updateSizes = () => {
      const wordsearch = wordsearchRef.current;
      if (!wordsearch) return;

      const liElements = wordsearch.querySelectorAll('li');
      liElements.forEach((li) => {
        const width = li.offsetWidth + 'px';
        li.style.height = width;
        li.style.lineHeight = width;
      });

      const totalWidth = wordsearch.offsetWidth + 'px';
      wordsearch.style.height = totalWidth;
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);

    const causeRepaintsOn = document.querySelectorAll('h1, h2, h3, p');
    const triggerRepaint = () => {
      causeRepaintsOn.forEach((el) => {
        el.style.zIndex = '1';
      });
    };
    window.addEventListener('resize', triggerRepaint);

    return () => {
      window.removeEventListener('resize', updateSizes);
      window.removeEventListener('resize', triggerRepaint);
    };
  }, []);

  useEffect(() => {
    const classes = [
      'one', 'two', 'three', 'four', 'five', 'six', 'seven',
      'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen',
      'fourteen', 'fifteen'
    ];

    let index = 0;
    const interval = setInterval(() => {
      const className = classes[index];
      const element = document.querySelector(`.${className}`);
      if (element) {
        element.classList.add('selected');
      }
      index++;
      if (index === classes.length) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div id="wrap">
      <style>{`
        @import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,300);

        body {
          background-color: #335B67;
          background: radial-gradient(ellipse at center, #335B67 0%, #2C3E50 100%) fixed no-repeat;
          font-family: 'Source Sans Pro', sans-serif;
          margin: 0px;
        }

        ::selection { background-color: rgba(0,0,0,0.2); }
        ::-moz-selection { background-color: rgba(0,0,0,0.2); }

        a {
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.5);
          transition: all 0.5s ease;
          margin-right: 10px;
        }
        a:last-child { margin-right: 0px; }
        a:hover {
          text-shadow: 0px 0px 1px rgba(255,255,255,.5);
          border-bottom: 1px solid rgba(255,255,255,1);
        }

        #wrap {
          width: 80%;
          max-width: 1400px;
          margin:0 auto;
          margin-top: 8%;
          position: relative;
        }

        #main-content {
          float: right;
          max-width: 45%;
          color: white;
          font-weight: 300;
          font-size: 18px;
          padding-bottom: 40px;
          line-height: 28px;
        }
        #main-content h1 {
          margin: 0px 0px 40px 0px;
          font-weight: 400;
          font-size: 42px;
        }

        #navigation { margin-top: 2%; }
        #navigation a.navigation {
          display: block;
          float: left;
          background-color: rgba(0,0,0,0.2);
          padding: 0 15px;
          color: white;
          height: 41px;
          line-height: 41px;
          font-size: 16px;
          margin-right: 2%;
          margin-bottom: 2%;
        }
        #navigation a.navigation:hover {
          background-color: rgba(26,188,156,0.7);
        }

        #wordsearch { width: 45%; float: left; }
        #wordsearch ul { margin: 0; padding: 0; }
        #wordsearch ul li {
          float: left;
          width: 12%;
          background-color: rgba(0,0,0,.2);
          list-style: none;
          margin: 0 0.5% 0.5% 0;
          padding: 0;
          display: block;
          text-align: center;
          color: rgba(255,255,255,0.7);
          text-transform: uppercase;
          overflow: hidden;
          font-size: 1.6vw;
          font-weight: 300;
          transition: background-color 0.75s ease;
        }
        #wordsearch ul li.selected {
          background-color: rgba(26,188,156,0.7);
          color: rgba(255,255,255,1);
          font-weight: 400;
        }

        #search { margin-top: 30px; }
        #search input[type='text'] {
          width: 88%;
          height: 41px;
          padding-left: 15px;
          box-sizing: border-box;
          background-color: rgba(0,0,0,0.2);
          border: none;
          outline: none;
          font-size: 16px;
          font-weight: 300;
          color: white;
          font-family: 'Source Sans Pro', sans-serif;
        }

        @media (max-width: 899px) { #wrap { width: 90%; } }
        @media (max-width: 799px) {
          #wrap { width: 90%; margin-top: 40px; }
          #wordsearch { width: 90%; float: none; margin:0 auto; }
          #wordsearch ul li { font-size: 4vw; }
          #main-content { float: none; width: 90%; margin: 30px auto 0; text-align: justify; }
          #main-content h1 { font-size: 32px; }
          #search input[type='text'] { width: 84%; }
        }
        @media (max-width: 499px) {
          #main-content h1 { font-size: 28px; }
        }
      `}</style>

      <div id="wordsearch" ref={wordsearchRef}>
        <ul>
          {/* ...Same <li> structure as before... */}
          <li>k</li><li>v</li><li>n</li><li>z</li><li>i</li><li>x</li><li>m</li><li>e</li><li>t</li><li>a</li><li>x</li><li>l</li>
          <li className="one">4</li><li className="two">0</li><li className="three">4</li>
          <li>y</li><li>y</li><li>w</li><li>v</li><li>b</li><li>o</li><li>q</li><li>d</li><li>y</li><li>p</li><li>a</li>
          <li className="four">p</li><li className="five">a</li><li className="six">g</li><li className="seven">e</li>
          <li>v</li><li>j</li><li>a</li><li className="eight">n</li><li className="nine">o</li><li className="ten">t</li>
          <li>s</li><li>c</li><li>e</li><li>w</li><li>v</li><li>x</li><li>e</li><li>p</li><li>c</li><li>f</li><li>h</li><li>q</li><li>e</li>
          <li className="eleven">f</li><li className="twelve">o</li><li className="thirteen">u</li><li className="fourteen">n</li><li className="fifteen">d</li>
          <li>s</li><li>w</li><li>q</li><li>v</li><li>o</li><li>s</li><li>m</li><li>v</li><li>f</li><li>u</li>
        </ul>
      </div>

      <div id="main-content">
        <h1>We couldn't find what you were looking for.</h1>
        <p>Unfortunately the page you were looking for could not be found. It may be temporarily unavailable, moved or no longer exist.</p>
        <p>Check the URL you entered for any mistakes and try again. Alternatively, search for whatever is missing or take a look around the rest of our site.</p>
        <div id="search">
          <form>
            <input type="text" placeholder="Search" />
          </form>
        </div>
        <div id="navigation">
          <a className="navigation" href="/">Home</a>
          <a className="navigation" href="/about">About</a>
          <a className="navigation" href="/shop">Shop</a>
          <a className="navigation" href="/contact">Contact</a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Error;
