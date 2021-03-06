import { h, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Rating
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { FilterBy } from "../../model/filter";
import { getPriceRange, getStarRange, getFacilities } from "../../utils/filter";

export const FilterByComponent = ({
  setStarFilter,
  setPriceFilter,
  setFacilityFilter,
  filterDataModel
}) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const [priceRange, setPriceRange] = useState<FilterBy[]>([]);
  const [starRange, setStarRange] = useState<FilterBy[]>([]);
  const [facilityRange, setFacilityRange] = useState<FilterBy[]>([]);

  const defaultFilterValue = {
    status: false,
    hotelIds: []
  };

  useEffect(() => {
    const starRange = getStarRange(filterDataModel);
    setStarRange(starRange);
  }, [filterDataModel]);

  useEffect(() => {
    const priceRange = getPriceRange(filterDataModel);
    setPriceRange(priceRange);
  }, [filterDataModel]);

  useEffect(() => {
    const facilityRange = getFacilities(filterDataModel);
    setFacilityRange(facilityRange);
  }, [filterDataModel]);

  const handleChange = (panel: string) => (
    _event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handlePriceCheckBoxChange = event => {
    if (event.target.checked) {
      const key = event.target.value;
      const hotelIds = setFilterHoltelIds(key, priceRange);
      return setPriceFilter({
        status: true,
        hotelIds
      });
    }
    setPriceFilter(defaultFilterValue);
  };

  const handleStarCheckBoxChange = event => {
    if (event.target.checked) {
      const key = event.target.value;
      const hotelIds = setFilterHoltelIds(key, starRange);
      return setStarFilter({
        status: true,
        hotelIds
      });
    }
    setStarFilter(defaultFilterValue);
  };

  const handleFacilityCheckBoxChange = event => {
    if (event.target.checked) {
      const key = event.target.value;
      const hotelIds = setFilterHoltelIds(key, facilityRange);
      return setFacilityFilter({
        status: true,
        hotelIds
      });
    }
    setFacilityFilter(defaultFilterValue);
  }

  const setFilterHoltelIds = (key: number, range: FilterBy[]) => {
    const getItems = range.filter(p => p.key == key);
    if (getItems && getItems.length > 0) {
      const hoteIds = getItems.map(i => i.hotelIds);
      if (hoteIds && hoteIds.length > 0) {
        return hoteIds[0];
      }
    }
    return [];
  };

  return (
    <Box sx={{ m: 2 }}>
      <Typography gutterBottom variant="h5" component="div">
        Filter by..
      </Typography>
      <Accordion
        expanded={expanded === "ratingPanel"}
        onChange={handleChange("ratingPanel")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="rating-content"
          id="rating-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>RATING</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {starRange &&
              starRange.map((range, index) => (
                <Box sx={{ display: "inline-flex", m: 1 }}>
                  <FormControlLabel
                    key={`star-${index}`}
                    control={
                      <Box>
                        <Checkbox
                          onChange={handleStarCheckBoxChange}
                          value={range.key}
                          sx={{ mb: 2 }}
                        />
                        <Rating value={+range.valueText} readOnly />
                      </Box>
                    }
                  />
                  <em>({range.hotelIds.length})</em>
                </Box>
              ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "ppPanel"}
        onChange={handleChange("ppPanel")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="pp-content"
          id="pp-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Price (pp)
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {priceRange &&
              priceRange.map((range, index) => (
                <Box sx={{ display: "inline-flex", m: 1 }}>
                  <FormControlLabel
                    key={`price-${index}`}
                    control={
                      <Checkbox
                        onChange={handlePriceCheckBoxChange}
                        value={range.key}
                      />
                    }
                    label={range.valueText}
                  />
                  <em>({range.hotelIds.length})</em>
                </Box>
              ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "hfPanel"}
        onChange={handleChange("hfPanel")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="hf-content"
          id="hf-header"
        >
          <Typography sx={{ width: "100%", flexShrink: 0 }}>
            Hotel Facilities
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {facilityRange &&
              facilityRange.map((range, index) => (
                <Box sx={{ display: "inline-flex", m: 1 }}>
                  <FormControlLabel
                    key={`facility-${index}`}
                    control={
                      <Checkbox
                        onChange={handleFacilityCheckBoxChange}
                        value={range.key}
                      />
                    }
                    label={range.valueText}
                  />
                  <em>({range.hotelIds.length})</em>
                </Box>
              ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
