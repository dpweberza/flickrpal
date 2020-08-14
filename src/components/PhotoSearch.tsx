import * as React from "react";
import { useState, useCallback } from "react";
import {
  Grid,
  Container,
  makeStyles,
  TextField,
  InputAdornment,
  Typography,
  CircularProgress,
  Box
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import SearchIcon from "@material-ui/icons/Search";
import debounce from "lodash.debounce";

import PhotoCard from "./PhotoCard";
import { searchPublicPhotos, PhotoItem } from "../service";

const useStyles = makeStyles((theme) => ({
  searchForm: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  }
}));

export default function PhotoSearch() {
  const classes = useStyles();
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [searchResults, setSearchResults] = useState<PhotoItem[]>();
  const [error, setError] = useState();
  const [processing, setProcessing] = useState<boolean>(false);

  const searchPhotos = async (tags: string) => {
    try {
      setProcessing(true);
      setError(undefined);
      const response = await searchPublicPhotos(tags);
      setSearchResults(response.items);
    } catch (ex) {
      setError(ex);
    } finally {
      setProcessing(false);
    }
  };

  const debouncedSearchPhotos = useCallback(
    debounce((tags: string) => searchPhotos(tags), 300),
    []
  );
  const handleSearchTermsChange = (newSearchTerms: string) => {
    setSearchTerms(newSearchTerms);
    debouncedSearchPhotos(newSearchTerms.split(/\s/).join(","));
  };

  return (
    <main>
      <div className={classes.searchForm}>
        <Container maxWidth="sm">
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Search our amazing public domain photos
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              value={searchTerms}
              onChange={(event) => handleSearchTermsChange(event.target.value)}
              fullWidth
              placeholder="Start typing one or more search terms"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </form>
          {error && (
            <Alert severity="error">
              Oops, something went wrong, please try again later.
            </Alert>
          )}
          {!processing && searchResults && searchResults.length === 0 && (
            <Alert severity="info">
              No search results, please try something else
            </Alert>
          )}
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        {processing && (
          <Box display="flex">
            <Box m="auto">
              <CircularProgress />
            </Box>
          </Box>
        )}
        <Grid container spacing={4}>
          {!processing &&
            searchResults &&
            searchResults.length > 0 &&
            searchResults.map((result) => {
              const authorRegexGroups = result.author.match(/(\(")(.+)("\))/);
              const author =
                authorRegexGroups && authorRegexGroups.length >= 3
                  ? authorRegexGroups[2]
                  : "Unknown";
              return (
                <Grid item key={result.link} xs={12} sm={6} md={4}>
                  <PhotoCard
                    title={result.title}
                    author={author}
                    authorId={result.author_id}
                    imageSrc={result.media.m}
                    link={result.link}
                    tags={result.tags.split(/\s/)}
                    onTagSelect={(tag) => handleSearchTermsChange(tag)}
                  />
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </main>
  );
}
