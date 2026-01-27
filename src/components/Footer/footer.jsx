import './Footer.css'

export default function Footer() {
  return (
    <>
      <footer className="containertwo">
        <div className="bfour">
          <h2>Company</h2>
          <p>About Us</p>
          <p>Careers</p>
        </div>

        <div className="bfive">
          <h2>Need Help</h2>
          <p>Visit Help Center?</p>
          <p>Share Feedback</p>
        </div>

        <div className="bsix">
          <h2>Veiw Website in</h2>
          <p>√ English ⩒</p>
        </div>

        <div className="bseven">
          <h2>Social Media</h2>
          <div className="i">
            <img src="/src/assets/facebook.png" alt="" />
            <img src="/src/assets/x2.png" alt="" />
          </div>
        </div>

        <div className="beight">
          <h2>Download Our App</h2>
          <div>
            <img src="/src/assets/Rectangle 4 (1).png" alt="" /> <br />
            <img src="/src/assets/Rectangle 5.png" alt="" />
          </div>
        </div>
      </footer>
      <div className="copy-right">
        <p>©2023 STREAM X. All Rights Reserved.</p>
        <div className="sd">
          <a href="">Terms Of Use</a>
          <a href="">Privacy Policy</a>
          <a href="">FAQ</a>
        </div>

        <div className="bone">
          <h2>STREAM<span>X</span></h2>
        </div>
      </div>
    </>
  )
}
