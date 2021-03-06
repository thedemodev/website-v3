import React from 'react';
import { StaticQuery, graphql, Link } from "gatsby";
import { css } from 'emotion';
import { rem } from 'polished';

import { mqMin } from '../../../styles/breackpoint';
import * as font from '../../../styles/fonts';

import SectionMinimal from '../../molecules/SectionMinimal';
import Title from '../../atoms/Title';
import Button from '../../atoms/Button';
import Content from '../../molecules/Content';

class OffboardingFail extends React.Component {
  constructor(props) {
    super(props);
    this.navigate = props.navigate;
    this.actualRender = this.actualRender.bind(this);
  }

  contactUs() {
    window.location.href = "mailto:privacy@getstation.com";
  }

  retry = () => {
    this.navigate('');
  }

  render() {
    return (
      <StaticQuery
        query={QUERY}
        render={this.actualRender}
      ></StaticQuery>
    );
  }

  actualRender(queryResults) {
    // Extract data from Query
    if (!queryResults) return null;
    const {
      bkg_image,
      title,
      content,
      button_cancel_text,
      button_confirm_text,
    } = queryResults.content.data;

    // Render with data
    return (
      <SectionMinimal background={bkg_image.url}>
        <Title
          element="h1"
          className={css({
            margin: `${rem(40)} 0 ${rem(10)}`,
            fontSize: font.XXL,
            [[mqMin[2]]]: {
              fontSize: font.XXXL,
            },
          })}
        >
          {title}
        </Title>

        <Content>
          <div dangerouslySetInnerHTML={{__html: content.html}} />
        </Content>

        <br/>
        
        <Button
          onClick={this.retry}
          theme="ghost"
          size="L"
          className={css({
            margin: `${rem(20)} ${rem(20)}`,
          })}
        >
          {button_cancel_text}
        </Button>

        <Button
        onClick={this.contactUs}
          theme="primary"
          size="L"
          className={css({
            margin: `${rem(20)} ${rem(20)}`,
          })}
        >
          {button_confirm_text}
        </Button>
      </SectionMinimal>
    );
  }
}

/**
 * GraphQL query to Prismic
 */
const QUERY = graphql`
  query privacyOffboardingFail {
    content: prismicOffboarding(uid: { eq: "offboarding-fail" }) {
      data {
        title,
        content {
          html,
        },
        button_cancel_text,
        button_confirm_text,
        bkg_image {
          url
        }
      }
    }
  }
`;

export default OffboardingFail;