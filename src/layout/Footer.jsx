import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 40px;
`;

const ContactInfo = styled.div`
  text-align: left;
`;

const RightsInfo = styled.div`
  text-align: right;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <ContactInfo>
        <h4>Contact Information</h4>
        <p>LAHY</p>
        <p>info@lahy.dk</p>
        <p>+45 23 67 89 00</p>
      </ContactInfo>
      <RightsInfo>
        <p>All rights reserved by LAHY.</p>
        <p>&copy; {new Date().getFullYear()} LAHY.</p>
      </RightsInfo>
    </FooterContainer>
  );
}
