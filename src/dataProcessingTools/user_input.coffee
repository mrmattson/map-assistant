### eslint-disable ###

# Methods:
#   (array) latLonExtract(inputString)
#     param: inputString - free text string that may contain latitude & longitude or MGRS coordinates (MGRS no yet implemented)
#     returns: array of draft coordinate objects
#
#       Draft coordinate objects have the following properties:
#         originalInput: text found by the regular expression
#         originalLatitude: latitude porition of text found by the regular expression
#         originalLongitude: longitude portion of the text found by the regular expression
#         latitude: numerical value in degress decimal format, ex: -34.683846
#         longitude: numerical value in degrees decimal format, ex: 101.353663
#         mgrs: string value of lat/lon coord converted to MGRS
#         formattedLatLon: pretty print version of lat/lon coord
#
#
# Dependencies
#
# - lodash.js
#

import _ from 'lodash'
import pad from 'pad'
import mgrsLib from 'mgrs'


LocRec = (->

  latLonRegEx = ///
    # http://www.regexr.com
    # http://www.regxlib.com
    # https://regex101.com
    # https://regexper.com/
    # http://bjorn.tipling.com/state-and-regular-expressions-in-javascript
    \s*                               # Absorb any amount of whitespace before

    (                                 # Capture group #1, latitude
      (?:                               # Non-capture group to setup 'or' cases
        (                               # Capture group #2, sign/hemisphere
          [+-]                         # Can either be plus (N) or minus (S) sign
          |                             # ...or...
          \b[NnSs]                      # North or South, case insensitive. Also, a boundary must preceed hemisphere letter.
        )
        \x20*                           # If there is a sign/hemisphere, absorb any amount of spaces
      )?
      (\d{1,2})                         # Capture group #3, degrees
      (?:                               # Non-capture group to setup 'or' cases
        [:°]?\x20*                      # Degrees separators and/or spaces
        (\d{1,2})                       # Capture group #4, minutes
        (?:                             # Non-capture group to setup 'or' cases
          [:'′]?\x20*                 # Minutes separators and/or spaces
          (\d{1,2})                     # Capture group #5, seconds
          (?:\.(\d+))?                  # Capture group #6, decimals for seconds, if any
          [:"″]?\x20*                 # Seconds separators and/or spaces
          |                             # ...or...
          (?:\.(\d+))?                  # Capture group #7, decimals for minutes, if any
          [:'′]?\x20*                 # Minutes separators and/or spaces
        )
        |                               # ...or...
        (?:\.(\d+))?                    # Capture group #8, decimals for degrees, if any
        [°]?\x20*                      # Degrees separators and/or spaces
      )
      ([NnSs]?)                         # Capture group #9, hemisphere, if exists and is after latitude digits, case insensitive
    )

    [\s,;/]*                           # Absorb any amount of whitespace and/or separators, or none, between latitude and longitude

    (                                 # Capture group #10, longitude
      (?:                             # Non-capture group to setup 'or' cases
        (                             # Capture group #11, sign/hemisphere
          [+-]                       # Can either be plus (E) or minus (W) sign
          |                           # ...or...
          [EeWw]                      # East or West, case insensitive
        )
        \x20*                         # If there is a sign/hemisphere, absorb any amount of spaces
      )?
      (\d{1,3})                        # Capture group #12, degrees
      (?:                             # Non-capture group to setup 'or' cases
        [:°]?\x20*                    # Degrees separators and/or spaces
        (\d{1,2})                        # Capture group #13, minutes
        (?:                           # Non-capture group to setup 'or' cases
          [:'′]?\x20*               # Minutes separators and/or spaces
          (\d{1,2})                      # Capture group #14, seconds
          (?:\.(\d+))?                # Capture group #15, decimals for seconds, if any
          [:"″]?\x20*               # Seconds separators and/or spaces
          |                           # ...or...
          (?:\.(\d+))?                # Capture group #16, decimals for minutes, if any
          [:'′]?\x20*               # Minutes separators and/or spaces
        )
        |                             # ...or...
        (?:\.(\d+))?                  # Capture group #17, decimals for degrees, if any
        [°]?\x20*                    # Degrees separators and/or spaces
      )
      ((?:[EeWw]\b)?)                 # Capture group #18, hemisphere, if exists and is after longitude digits, case insensitive. Also a boundary must follow hemisphere letter.
    )

    \s*                               # Absorb any amount of whitespace after
  ///

  signRegEx = /[+-]/

  hemisphereLatRegEx = /[NnSs]/

  hemisphereLonRegEx = /[EeWw]/

  mgrsRegEx = ///
    \s*							            # Absorb any amount of whitespace before
    (											      # Capture group #1, the entire grid
      (\d{1,2}[A-Za-z])			    # Capture group #2, grid zone designator, the only required portion of MGRS
      [\x20\t]*							    # Absorb any amount of space or tab whitespace
      (?:										    # Non-capturing group to group the 100,000 meter square identifier
        ([A-Za-z]{2})					  # Capture group #3, 100,000 meter square identifier
        [\x20\t]*							  # Absorb any amount of space or tab whitespace
        (											  # Capture group #4, numerical location
          \d{5}[\x20\t]*\d{5}		# 2 digit numerical location, 10km precision
          |											# or
          \d{4}[\x20\t]*\d{4}		# 4 digit numerical location, 10m precision
          |											# or
          \d{3}[\x20\t]*\d{3}		# 6 digit numerical location, 100m precision
          |											# or
          \d{2}[\x20\t]*\d{2}		# 8 digit numerical location, 10m precision
          |											# or
          \d{1}[\x20\t]*\d{1}		# 10 digit numerical location, 1m precision
        ) 										  # End numerical location
      )		 						 		      # End 100,000 meter square identification
    )											      # End MGRS capturing group
    \s*							      # Absorb any amount of whitespace after
  ///

  eastingNorthingRegEx = ///
    (\d{1,5})                   # Capture group #1, easting
    [\x20*\t]*                  # Absorb any amount of space or tab whitespace
    (\d{1,5})                   # Capture group #2, northing
    ///

  return {
    mgrsExtract: (inputString) ->
      DEBUG = false

      # Loop through inputString, picking out matches to the regular expression as we go
      originalStringIndex = 0
      resultObjectsArray = []
      regExIndex = inputString.search mgrsRegEx
      until regExIndex is -1
        console.log "regExIndex: #{regExIndex}" if DEBUG

        originalStringIndex = originalStringIndex + regExIndex

        regExExecArray = mgrsRegEx.exec inputString
        console.log "regExExecArray: #{JSON.stringify regExExecArray}" if DEBUG

        resultObjectsArray.push {
          startIndex : originalStringIndex
          length : regExExecArray[0].length
          regExCapGrpsArray : regExExecArray
          originalInput : regExExecArray[0]
        }

        console.log "Current resultsObjectArray: #{JSON.stringify resultObjectsArray}" if DEBUG

        originalStringIndex = originalStringIndex + _.last(resultObjectsArray).length
        console.log "originalStringIndex: #{originalStringIndex}" if DEBUG
        inputString = inputString.substr (regExIndex + _.last(resultObjectsArray).length)
        console.log "inputString: #{inputString}" if DEBUG

        regExIndex = inputString.search mgrsRegEx

      # Loop through what we found with the regular expression
      regExExecArray = []
      resultsArray = []
      unless _.isEmpty resultObjectsArray
        for object in resultObjectsArray
          regExResult = object.regExCapGrpsArray

          originalInput = regExResult[1]

          gridZoneDesignator = regExResult[2]
          console.log "gridZoneDesignator: #{gridZoneDesignator}" if DEBUG
          oneHundredThousandIdentifier = regExResult[3]
          console.log "oneHundredThousandIdentifier: #{oneHundredThousandIdentifier}" if DEBUG
          eastingAndNorthing = regExResult[4]
          console.log "eastingAndNorthing: #{eastingAndNorthing}" if DEBUG

          regExExecArray = eastingNorthingRegEx.exec eastingAndNorthing
          easting = regExExecArray[1]
          console.log "easting: #{easting}" if DEBUG
          northing = regExExecArray[2]
          console.log "northing: #{northing}" if DEBUG

          mgrs = "#{gridZoneDesignator}#{oneHundredThousandIdentifier}#{easting}#{northing}"
          formattedMgrs = "#{gridZoneDesignator} #{oneHundredThousandIdentifier} #{easting} #{northing}"
          console.log "formattedMgrs: #{formattedMgrs}" if DEBUG

          latLon = mgrsLib.toPoint mgrs
          console.log "latLon: #{JSON.stringify latLon}" if DEBUG

          resultsArray.push {
            originalFormat: 'mgrs'
            originalInput: originalInput
            latitude: latLon[1]
            longitude: latLon[0]
            mgrs: mgrs
            formattedMgrs: formattedMgrs
          }

      # else # resultObjectsArray is Empty
      #   console.log "Invalid input, no match found. Input: #{inputString}" if DEBUG
      #   return []

      console.log JSON.stringify resultsArray if DEBUG
      return resultsArray


    latLonExtract: (inputString) ->

      DEBUG = false

      # Loop through inputString, picking out matches to the regular expression as we go
      originalStringIndex = 0
      resultObjectsArray = []
      regExIndex = inputString.search latLonRegEx
      until regExIndex is -1
        console.log "regExIndex: #{regExIndex}" if DEBUG

        originalStringIndex = originalStringIndex + regExIndex

        regExExecArray = latLonRegEx.exec inputString
        console.log "regExExecArray: #{JSON.stringify regExExecArray}" if DEBUG

        resultObjectsArray.push {
          startIndex : originalStringIndex
          length : regExExecArray[0].length
          regExCapGrpsArray : regExExecArray
          originalInput : regExExecArray[0]
        }

        console.log "Current resultsObjectArray: #{JSON.stringify resultObjectsArray}" if DEBUG

        originalStringIndex = originalStringIndex + _.last(resultObjectsArray).length
        console.log "originalStringIndex: #{originalStringIndex}" if DEBUG
        inputString = inputString.substr (regExIndex + _.last(resultObjectsArray).length)
        console.log "inputString: #{inputString}" if DEBUG

        regExIndex = inputString.search latLonRegEx


      # Loop through what we found with the regular expression
      resultsArray = []
      unless _.isEmpty resultObjectsArray
        for object in resultObjectsArray
          regExResult = object.regExCapGrpsArray

          originalInput = regExResult[0]

          originalLat = regExResult[1]
          degreesLatWhole = regExResult[3]
          degreesLatDecimal = regExResult[8]
          minutesLatWhole = regExResult[4]
          minutesLatDecimal = regExResult[7]
          secondsLatWhole = regExResult[5]
          secondsLatDecimal = regExResult[6]
          leadingLatSignHemisphere = regExResult[2]
          trailingLatHemisphere = regExResult[9]

          originalLon = regExResult[10]
          degreesLonWhole = regExResult[12]
          degreesLonDecimal = regExResult[17]
          minutesLonWhole = regExResult[13]
          minutesLonDecimal = regExResult[16]
          secondsLonWhole = regExResult[14]
          secondsLonDecimal = regExResult[15]
          leadingLonSignHemisphere = regExResult[11]
          trailingLonHemisphere = regExResult[18]

          mixedWhole = 0
          mixedDecimal = 0.0

          # Latitude Setup
          degreesLat = 0.0
          minutesLat = 0.0
          secondsLat = 0.0

          # Longitude Setup
          degreesLon = 0.0
          minutesLon = 0.0
          secondsLon = 0.0

          # First, parse strings into numbers for latitude
          if _.isUndefined degreesLatDecimal
            degreesLat = parseInt degreesLatWhole, 10
            cleanLatitude = "#{pad 2, degreesLat, '0'}"
            unless _.isUndefined minutesLatWhole
              if _.isUndefined minutesLatDecimal
                minutesLat = parseInt minutesLatWhole, 10
                cleanLatitude = "#{cleanLatitude} #{pad 2, minutesLat, '0'}"
                unless _.isUndefined secondsLatWhole
                  if _.isUndefined secondsLatDecimal
                    secondsLat = parseInt secondsLatWhole, 10
                    cleanLatitude = "#{cleanLatitude} #{pad 2, secondsLat, '0'}"
                  else # Decimal of seconds is defined
                    mixedWhole = secondsLatWhole
                    mixedDecimal = secondsLatDecimal
                    secondsLat = parseFloat "#{mixedWhole}.#{mixedDecimal}"
                    cleanLatitude = "#{cleanLatitude} #{pad 2, secondsLat, '0'}"
              else # Decimal of minutes is defined, end here (no seconds)
                mixedWhole = minutesLatWhole
                mixedDecimal = minutesLatDecimal
                minutesLat = parseFloat "#{mixedWhole}.#{mixedDecimal}"
                cleanLatitude = "#{cleanLatitude} #{pad 2, minutesLat, '0'}"
          else # Decimal of degrees is defined, end here (no minutes or seconds)
            mixedWhole = degreesLatWhole
            mixedDecimal = degreesLatDecimal
            degreesLat = parseFloat "#{mixedWhole}.#{mixedDecimal}"
            cleanLatitude = "#{pad 2, degreesLat, '0'}"

          # Second, parse strings into numbers for longitude
          if _.isUndefined degreesLonDecimal
            degreesLon = parseInt degreesLonWhole, 10
            cleanLongitude = "#{pad 3, degreesLon, '0'}"
            unless _.isUndefined minutesLonWhole
              if _.isUndefined minutesLonDecimal
                minutesLon = parseInt minutesLonWhole, 10
                cleanLongitude = "#{cleanLongitude} #{pad 2, minutesLon, '0'}"
                unless _.isUndefined secondsLonWhole
                  if _.isUndefined secondsLonDecimal
                    secondsLon = parseInt secondsLonWhole, 10
                    cleanLongitude = "#{cleanLongitude} #{pad 2, secondsLon, '0'}"
                  else # Decimal of seconds is defined
                    mixedWhole = secondsLonWhole
                    mixedDecimal = secondsLonDecimal
                    secondsLon = parseFloat "#{mixedWhole}.#{mixedDecimal}"
                    cleanLongitude = "#{cleanLongitude} #{pad 2, secondsLon, '0'}"
              else # Decimal of minutes is defined, end here (no seconds)
                mixedWhole = minutesLonWhole
                mixedDecimal = minutesLonDecimal
                minutesLon = parseFloat "#{mixedWhole}.#{mixedDecimal}"
                cleanLongitude = "#{cleanLongitude} #{pad 2, minutesLon, '0'}"
          else # Decimal of degrees is defined, end here (no minutes or seconds)
            mixedWhole = degreesLonWhole
            mixedDecimal = degreesLonDecimal
            degreesLon = parseFloat "#{mixedWhole}.#{mixedDecimal}"
            cleanLongitude = "#{pad 3, degreesLon, '0'}"

          # 'Working' is for computation needs. We'll keep the original form around too.
          console.log "degreesLat: #{degreesLat}, minutesLat: #{minutesLat}, secondsLat: #{secondsLat}" if DEBUG
          console.log "degreesLon: #{degreesLon}, minutesLon: #{minutesLon}, secondsLon: #{secondsLon}" if DEBUG
          workingLat = degreesLat + (minutesLat + secondsLat / 60) / 60
          workingLon = degreesLon + (minutesLon + secondsLon / 60) / 60
          # Because of Javascripts binary math, we'll hack together the following to get rid of tiny decimals
          workingLat = parseFloat workingLat.toFixed(8), 10
          workingLon = parseFloat workingLon.toFixed(8), 10
          console.log "workingLat: #{workingLat}, workingLon: #{workingLon}" if DEBUG

          # Ensure latitude and longitude are in the valid ranges
          if workingLat <= 90 and workingLon <= 180

            hemisphereLat = 'N'
            hemisphereLon = 'E'

            # Apply sign based on sign or hemisphere to latitude
            unless _.isUndefined leadingLatSignHemisphere
              if signRegEx.test(leadingLatSignHemisphere) and leadingLatSignHemisphere is '-'
                hemisphereLat = 'S'
              else if hemisphereLatRegEx.test(leadingLatSignHemisphere) and leadingLatSignHemisphere.toUpperCase() is 'S'
                hemisphereLat = 'S'
            else unless _.isUndefined trailingLatHemisphere
              if hemisphereLatRegEx.test(trailingLatHemisphere) and trailingLatHemisphere.toUpperCase() is 'S'
                hemisphereLat = 'S'
            if hemisphereLat is 'S'
              workingLat = workingLat * -1

            # Apply sign based on sign or hemisphere to longitude
            unless _.isUndefined leadingLonSignHemisphere
              if signRegEx.test(leadingLonSignHemisphere) and leadingLonSignHemisphere is '-'
                hemisphereLon = 'W'
              else if hemisphereLonRegEx.test(leadingLonSignHemisphere) and leadingLonSignHemisphere.toUpperCase() is 'W'
                hemisphereLon = 'W'
            else unless _.isUndefined trailingLonHemisphere
              if hemisphereLonRegEx.test(trailingLonHemisphere) and trailingLonHemisphere.toUpperCase() is 'W'
                hemisphereLon = 'W'
            if hemisphereLon is 'W'
              workingLon = workingLon * -1

            console.log "Valid input #{object.originalInput}" if DEBUG
            console.log "lat: #{workingLat}, lon: #{workingLon}" if DEBUG

            resultsArray.push {
              originalFormat: 'lat_lon'
              originalInput: originalInput
              originalHighlight: [object.startIndex, object.length]
              originalLatitude: originalLat
              originalLongitude: originalLon
              latitude: workingLat
              longitude: workingLon
              mgrs: mgrsLib.forward [workingLon, workingLat]
              formattedLatLon: "#{cleanLatitude} #{hemisphereLat}, #{cleanLongitude} #{hemisphereLon}"
            }

          # else # Latitude and longitude are not in the valid ranges
          #   console.log "Invalid input #{object.originalInput}" if DEBUG
          #   return []

      # else # resultObjectsArray is Empty
      #   console.log "Invalid input, no match found. Input: #{inputString}" if DEBUG
      #   return []

      console.log JSON.stringify resultsArray if DEBUG
      return resultsArray

    # extract: (inputString) =>
    #   resultsArray = @latLonExtract inputString
    #   resultsArray = resultsArray.concat @mgrsExtract
    #   return resultsArray
  }
)()

export default LocRec
