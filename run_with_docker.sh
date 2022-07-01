#!/bin/bash
docker run -v ~:/file mekpro/csvtogsheets \
  --credpath /file/.gsheetapi.json \
  --csvpath /file/file_to_import.csv \
  --gsheetid <google_sheet_id> \
  --gsheettitle <google_sheet_name> 
