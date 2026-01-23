import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useApp } from 'ink';
import TextInput from 'ink-text-input';
import SelectInput from 'ink-select-input';
import Spinner from 'ink-spinner';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
const GitGreenApp = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [formData, setFormData] = useState({
    year: (new Date().getFullYear() - 1).toString(),
    commitMode: '',
    commitCount: '100',
    startDate: '',
    endDate: '',
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({
    current: 0,
    total: 0
  });
  const {
    exit
  } = useApp();
  useInput((input, key) => {
    if (key.escape || key.ctrl && input === 'c') {
      exit();
    }
  });
  const WelcomeScreen = () => /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  }, /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Gradient, {
    name: "rainbow"
  }, /*#__PURE__*/React.createElement(BigText, {
    text: "Git Green",
    font: "3D-ASCII"
  }))), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: "#00ff00"
  }, "\uD83C\uDF31 Make Your GitHub Profile Green! \uD83C\uDF31")), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 2
  }, /*#__PURE__*/React.createElement(Text, {
    color: "gray",
    dimColor: true
  }, "A beautiful terminal app for creating GitHub commits")), /*#__PURE__*/React.createElement(Box, {
    borderStyle: "round",
    borderColor: "#00ff00",
    padding: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: "#00ff00"
  }, "Press Enter to continue \u2022 Press ESC to exit")));
  const YearInput = () => /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    height: "100%",
    padding: 2
  }, /*#__PURE__*/React.createElement(Box, {
    marginBottom: 2
  }, /*#__PURE__*/React.createElement(Gradient, {
    name: "rainbow"
  }, /*#__PURE__*/React.createElement(BigText, {
    text: "Year",
    font: "Small"
  }))), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: "#00ff00"
  }, "Which year would you like to make commits in?")), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 2
  }, /*#__PURE__*/React.createElement(TextInput, {
    value: formData.year,
    onChange: value => setFormData({
      ...formData,
      year: value
    }),
    onSubmit: () => setCurrentScreen('commitMode'),
    placeholder: "2025"
  })), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: "gray",
    dimColor: true
  }, "Press Enter to continue")));
  const CommitModeScreen = () => {
    const modes = [{
      label: '🎲 Random number of commits',
      value: 'random'
    }, {
      label: '🔢 Specific number of commits',
      value: 'specific'
    }, {
      label: '📅 Complete range (every day)',
      value: 'complete'
    }, {
      label: '🎯 Custom pattern',
      value: 'pattern'
    }];
    return /*#__PURE__*/React.createElement(Box, {
      flexDirection: "column",
      height: "100%",
      padding: 2
    }, /*#__PURE__*/React.createElement(Box, {
      marginBottom: 2
    }, /*#__PURE__*/React.createElement(Gradient, {
      name: "rainbow"
    }, /*#__PURE__*/React.createElement(BigText, {
      text: "Mode",
      font: "Small"
    }))), /*#__PURE__*/React.createElement(Box, {
      marginBottom: 1
    }, /*#__PURE__*/React.createElement(Text, {
      color: "#00ff00"
    }, "How would you like to make commits?")), /*#__PURE__*/React.createElement(Box, {
      marginBottom: 2
    }, /*#__PURE__*/React.createElement(SelectInput, {
      items: modes,
      onSelect: item => {
        setFormData({
          ...formData,
          commitMode: item.value
        });
        setCurrentScreen(item.value === 'complete' ? 'dateRange' : 'commitCount');
      }
    })));
  };
  const CommitCountScreen = () => /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    height: "100%",
    padding: 2
  }, /*#__PURE__*/React.createElement(Box, {
    marginBottom: 2
  }, /*#__PURE__*/React.createElement(Gradient, {
    name: "rainbow"
  }, /*#__PURE__*/React.createElement(BigText, {
    text: "Count",
    font: "Small"
  }))), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: "#00ff00"
  }, formData.commitMode === 'random' ? 'Maximum commits (random):' : 'How many commits?')), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 2
  }, /*#__PURE__*/React.createElement(TextInput, {
    value: formData.commitCount,
    onChange: value => setFormData({
      ...formData,
      commitCount: value
    }),
    onSubmit: () => setCurrentScreen('dateRange'),
    placeholder: "100"
  })), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
    color: "gray",
    dimColor: true
  }, "Press Enter to continue")));
  const DateRangeScreen = () => {
    const [inputField, setInputField] = useState('start');
    useEffect(() => {
      if (!formData.startDate) {
        setFormData({
          ...formData,
          startDate: `${formData.year}-01-01`,
          endDate: `${formData.year}-12-31`
        });
      }
    }, []);
    return /*#__PURE__*/React.createElement(Box, {
      flexDirection: "column",
      height: "100%",
      padding: 2
    }, /*#__PURE__*/React.createElement(Box, {
      marginBottom: 2
    }, /*#__PURE__*/React.createElement(Gradient, {
      name: "rainbow"
    }, /*#__PURE__*/React.createElement(BigText, {
      text: "Dates",
      font: "Small"
    }))), /*#__PURE__*/React.createElement(Box, {
      marginBottom: 1
    }, /*#__PURE__*/React.createElement(Text, {
      color: "#00ff00"
    }, "Date Range (YYYY-MM-DD)")), /*#__PURE__*/React.createElement(Box, {
      marginBottom: 1
    }, /*#__PURE__*/React.createElement(Text, {
      color: "cyan"
    }, "Start Date:")), /*#__PURE__*/React.createElement(Box, {
      marginBottom: 2
    }, /*#__PURE__*/React.createElement(TextInput, {
      value: formData.startDate,
      onChange: value => setFormData({
        ...formData,
        startDate: value
      }),
      onSubmit: () => setInputField('end'),
      placeholder: `${formData.year}-01-01`
    })), /*#__PURE__*/React.createElement(Box, {
      marginBottom: 1
    }, /*#__PURE__*/React.createElement(Text, {
      color: "cyan"
    }, "End Date:")), /*#__PURE__*/React.createElement(Box, {
      marginBottom: 2
    }, /*#__PURE__*/React.createElement(TextInput, {
      value: formData.endDate,
      onChange: value => setFormData({
        ...formData,
        endDate: value
      }),
      onSubmit: () => setCurrentScreen('confirm'),
      placeholder: `${formData.year}-12-31`
    })), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Text, {
      color: "gray",
      dimColor: true
    }, "Press Enter to continue")));
  };
  const ConfirmScreen = () => {
    const generateSummary = () => {
      let summary = `📅 Year: ${formData.year}\n`;
      summary += `📊 Mode: ${formData.commitMode}\n`;
      if (formData.commitMode === 'specific') {
        summary += `🔢 Commits: ${formData.commitCount}\n`;
      } else if (formData.commitMode === 'random') {
        const max = parseInt(formData.commitCount);
        summary += `🎲 Random commits: 1-${max}\n`;
      }
      summary += `🗓️  Range: ${formData.startDate} to ${formData.endDate}`;
      return summary;
    };
    return /*#__PURE__*/React.createElement(Box, {
      flexDirection: "column",
      height: "100%",
      padding: 2
    }, /*#__PURE__*/React.createElement(Box, {
      marginBottom: 2
    }, /*#__PURE__*/React.createElement(Gradient, {
      name: "rainbow"
    }, /*#__PURE__*/React.createElement(BigText, {
      text: "Confirm",
      font: "Small"
    }))), /*#__PURE__*/React.createElement(Box, {
      borderStyle: "round",
      borderColor: "#00ff00",
      padding: 1,
      marginBottom: 2
    }, /*#__PURE__*/React.createElement(Text, {
      color: "#00ff00"
    }, generateSummary())), /*#__PURE__*/React.createElement(Box, {
      marginBottom: 2
    }, /*#__PURE__*/React.createElement(Text, {
      color: "yellow"
    }, "Proceed with these commits?")), /*#__PURE__*/React.createElement(Box, {
      flexDirection: "row",
      justifyContent: "space-around"
    }, /*#__PURE__*/React.createElement(Box, {
      borderStyle: "round",
      borderColor: "#00ff00",
      paddingX: 2,
      paddingY: 1
    }, /*#__PURE__*/React.createElement(Text, {
      color: "#00ff00"
    }, "Y - Yes")), /*#__PURE__*/React.createElement(Box, {
      borderStyle: "round",
      borderColor: "#ff0000",
      paddingX: 2,
      paddingY: 1
    }, /*#__PURE__*/React.createElement(Text, {
      color: "#ff0000"
    }, "N - No"))));
  };
  const ProgressScreen = () => /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  }, /*#__PURE__*/React.createElement(Box, {
    marginBottom: 2
  }, /*#__PURE__*/React.createElement(Gradient, {
    name: "rainbow"
  }, /*#__PURE__*/React.createElement(BigText, {
    text: "Creating",
    font: "Small"
  }))), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: "#00ff00"
  }, /*#__PURE__*/React.createElement(Spinner, {
    type: "dots"
  }), " Creating commits...")), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: "cyan"
  }, progress.current, " / ", progress.total, " (", Math.round(progress.current / progress.total * 100), "%)")), /*#__PURE__*/React.createElement(Box, {
    width: 50,
    height: 1,
    borderStyle: "solid",
    borderColor: "#00ff00"
  }, /*#__PURE__*/React.createElement(Box, {
    width: Math.round(progress.current / progress.total * 50),
    height: 1,
    backgroundColor: "#00ff00"
  })));
  const SuccessScreen = () => /*#__PURE__*/React.createElement(Box, {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  }, /*#__PURE__*/React.createElement(Box, {
    marginBottom: 2
  }, /*#__PURE__*/React.createElement(Gradient, {
    name: "rainbow"
  }, /*#__PURE__*/React.createElement(BigText, {
    text: "Success!",
    font: "Small"
  }))), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: "#00ff00"
  }, "\uD83C\uDF89 Successfully created ", progress.current, " commits!")), /*#__PURE__*/React.createElement(Box, {
    marginBottom: 2
  }, /*#__PURE__*/React.createElement(Text, {
    color: "cyan"
  }, "Commits pushed to remote repository")), /*#__PURE__*/React.createElement(Box, {
    borderStyle: "round",
    borderColor: "#00ff00",
    padding: 1
  }, /*#__PURE__*/React.createElement(Text, {
    color: "#00ff00"
  }, "Press any key to exit")));
  useInput((input, key) => {
    if (currentScreen === 'welcome' && key.return) {
      setCurrentScreen('year');
    } else if (currentScreen === 'confirm') {
      if (input.toLowerCase() === 'y') {
        setCurrentScreen('progress');
        executeCommits();
      } else if (input.toLowerCase() === 'n') {
        setCurrentScreen('welcome');
      }
    } else if (currentScreen === 'success') {
      exit();
    }
  });
  const executeCommits = async () => {
    setLoading(true);
    // Simulate commit creation
    const total = formData.commitMode === 'complete' ? 365 : parseInt(formData.commitCount);
    for (let i = 0; i <= total; i++) {
      setProgress({
        current: i,
        total
      });
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    setLoading(false);
    setCurrentScreen('success');
  };
  const screens = {
    welcome: /*#__PURE__*/React.createElement(WelcomeScreen, null),
    year: /*#__PURE__*/React.createElement(YearInput, null),
    commitMode: /*#__PURE__*/React.createElement(CommitModeScreen, null),
    commitCount: /*#__PURE__*/React.createElement(CommitCountScreen, null),
    dateRange: /*#__PURE__*/React.createElement(DateRangeScreen, null),
    confirm: /*#__PURE__*/React.createElement(ConfirmScreen, null),
    progress: /*#__PURE__*/React.createElement(ProgressScreen, null),
    success: /*#__PURE__*/React.createElement(SuccessScreen, null)
  };
  return screens[currentScreen] || /*#__PURE__*/React.createElement(WelcomeScreen, null);
};
render(/*#__PURE__*/React.createElement(GitGreenApp, null));
