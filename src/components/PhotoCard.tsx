import * as React from "react";
import {
  makeStyles,
  Card,
  CardMedia,
  CardContent,
  CardHeader
} from "@material-ui/core";

import Tags from "./Tags";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardHeaderContent: {
    width: "100%"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
}));

const MAX_TAGS = 10; // You know influencers go abit crazy

interface Props {
  title: string;
  author: string;
  authorId: string;
  imageSrc: string;
  link: string;
  tags: string[];
  onTagSelect: (tag: string) => void;
}

export default function PhotoCard({
  title,
  author,
  authorId,
  imageSrc,
  link,
  tags,
  onTagSelect
}: Props) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          content: classes.cardHeaderContent
        }}
        title={title}
        titleTypographyProps={{
          noWrap: true,
          title: title,
          variant: "body1"
        }}
        subheader={"@" + author}
        subheaderTypographyProps={{
          variant: "body2",
          component: "a",
          href: `https://www.flickr.com/people/${authorId}/`,
          target: "_blank",
          style: { textDecoration: "none" }
        }}
      />
      <CardMedia
        className={classes.cardMedia}
        image={imageSrc}
        title={title}
        component="a"
        href={link}
        target="_blank"
      />
      <CardContent className={classes.cardContent}>
        <Tags tags={tags.splice(0, MAX_TAGS)} onTagSelect={onTagSelect} />
      </CardContent>
    </Card>
  );
}
