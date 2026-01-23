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
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const { exit } = useApp();

  useInput((input, key) => {
    if (key.escape || (key.ctrl && input === 'c')) {
      exit();
    }
  });

  const WelcomeScreen = () => (
    <Box flexDirection="column" alignItems="center" justifyContent="center" height="100%">
      <Box marginBottom={1}>
        <Gradient name="rainbow">
          <BigText text="Git Green" font="3D-ASCII" />
        </Gradient>
      </Box>
      
      <Box marginBottom={1}>
        <Text color="#00ff00">🌱 Make Your GitHub Profile Green! 🌱</Text>
      </Box>
      
      <Box marginBottom={2}>
        <Text color="gray" dimColor>
          A beautiful terminal app for creating GitHub commits
        </Text>
      </Box>
      
      <Box borderStyle="round" borderColor="#00ff00" padding={1}>
        <Text color="#00ff00">Press Enter to continue • Press ESC to exit</Text>
      </Box>
    </Box>
  );

  const YearInput = () => (
    <Box flexDirection="column" height="100%" padding={2}>
      <Box marginBottom={2}>
        <Gradient name="rainbow">
          <BigText text="Year" font="Small" />
        </Gradient>
      </Box>
      
      <Box marginBottom={1}>
        <Text color="#00ff00">Which year would you like to make commits in?</Text>
      </Box>
      
      <Box marginBottom={2}>
        <TextInput
          value={formData.year}
          onChange={(value) => setFormData({...formData, year: value})}
          onSubmit={() => setCurrentScreen('commitMode')}
          placeholder="2025"
        />
      </Box>
      
      <Box>
        <Text color="gray" dimColor>Press Enter to continue</Text>
      </Box>
    </Box>
  );

  const CommitModeScreen = () => {
    const modes = [
      { label: '🎲 Random number of commits', value: 'random' },
      { label: '🔢 Specific number of commits', value: 'specific' },
      { label: '📅 Complete range (every day)', value: 'complete' },
      { label: '🎯 Custom pattern', value: 'pattern' }
    ];

    return (
      <Box flexDirection="column" height="100%" padding={2}>
        <Box marginBottom={2}>
          <Gradient name="rainbow">
            <BigText text="Mode" font="Small" />
          </Gradient>
        </Box>
        
        <Box marginBottom={1}>
          <Text color="#00ff00">How would you like to make commits?</Text>
        </Box>
        
        <Box marginBottom={2}>
          <SelectInput
            items={modes}
            onSelect={(item) => {
              setFormData({...formData, commitMode: item.value});
              setCurrentScreen(item.value === 'complete' ? 'dateRange' : 'commitCount');
            }}
          />
        </Box>
      </Box>
    );
  };

  const CommitCountScreen = () => (
    <Box flexDirection="column" height="100%" padding={2}>
      <Box marginBottom={2}>
        <Gradient name="rainbow">
          <BigText text="Count" font="Small" />
        </Gradient>
      </Box>
      
      <Box marginBottom={1}>
        <Text color="#00ff00">
          {formData.commitMode === 'random' ? 'Maximum commits (random):' : 'How many commits?'}
        </Text>
      </Box>
      
      <Box marginBottom={2}>
        <TextInput
          value={formData.commitCount}
          onChange={(value) => setFormData({...formData, commitCount: value})}
          onSubmit={() => setCurrentScreen('dateRange')}
          placeholder="100"
        />
      </Box>
      
      <Box>
        <Text color="gray" dimColor>Press Enter to continue</Text>
      </Box>
    </Box>
  );

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

    return (
      <Box flexDirection="column" height="100%" padding={2}>
        <Box marginBottom={2}>
          <Gradient name="rainbow">
            <BigText text="Dates" font="Small" />
          </Gradient>
        </Box>
        
        <Box marginBottom={1}>
          <Text color="#00ff00">Date Range (YYYY-MM-DD)</Text>
        </Box>
        
        <Box marginBottom={1}>
          <Text color="cyan">Start Date:</Text>
        </Box>
        <Box marginBottom={2}>
          <TextInput
            value={formData.startDate}
            onChange={(value) => setFormData({...formData, startDate: value})}
            onSubmit={() => setInputField('end')}
            placeholder={`${formData.year}-01-01`}
          />
        </Box>
        
        <Box marginBottom={1}>
          <Text color="cyan">End Date:</Text>
        </Box>
        <Box marginBottom={2}>
          <TextInput
            value={formData.endDate}
            onChange={(value) => setFormData({...formData, endDate: value})}
            onSubmit={() => setCurrentScreen('confirm')}
            placeholder={`${formData.year}-12-31`}
          />
        </Box>
        
        <Box>
          <Text color="gray" dimColor>Press Enter to continue</Text>
        </Box>
      </Box>
    );
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

    return (
      <Box flexDirection="column" height="100%" padding={2}>
        <Box marginBottom={2}>
          <Gradient name="rainbow">
            <BigText text="Confirm" font="Small" />
          </Gradient>
        </Box>
        
        <Box borderStyle="round" borderColor="#00ff00" padding={1} marginBottom={2}>
          <Text color="#00ff00">{generateSummary()}</Text>
        </Box>
        
        <Box marginBottom={2}>
          <Text color="yellow">Proceed with these commits?</Text>
        </Box>
        
        <Box flexDirection="row" justifyContent="space-around">
          <Box borderStyle="round" borderColor="#00ff00" paddingX={2} paddingY={1}>
            <Text color="#00ff00">Y - Yes</Text>
          </Box>
          <Box borderStyle="round" borderColor="#ff0000" paddingX={2} paddingY={1}>
            <Text color="#ff0000">N - No</Text>
          </Box>
        </Box>
      </Box>
    );
  };

  const ProgressScreen = () => (
    <Box flexDirection="column" alignItems="center" justifyContent="center" height="100%">
      <Box marginBottom={2}>
        <Gradient name="rainbow">
          <BigText text="Creating" font="Small" />
        </Gradient>
      </Box>
      
      <Box marginBottom={1}>
        <Text color="#00ff00">
          <Spinner type="dots" /> Creating commits...
        </Text>
      </Box>
      
      <Box marginBottom={1}>
        <Text color="cyan">
          {progress.current} / {progress.total} ({Math.round((progress.current / progress.total) * 100)}%)
        </Text>
      </Box>
      
      <Box width={50} height={1} borderStyle="solid" borderColor="#00ff00">
        <Box 
          width={Math.round((progress.current / progress.total) * 50)} 
          height={1} 
          backgroundColor="#00ff00"
        />
      </Box>
    </Box>
  );

  const SuccessScreen = () => (
    <Box flexDirection="column" alignItems="center" justifyContent="center" height="100%">
      <Box marginBottom={2}>
        <Gradient name="rainbow">
          <BigText text="Success!" font="Small" />
        </Gradient>
      </Box>
      
      <Box marginBottom={1}>
        <Text color="#00ff00">🎉 Successfully created {progress.current} commits!</Text>
      </Box>
      
      <Box marginBottom={2}>
        <Text color="cyan">Commits pushed to remote repository</Text>
      </Box>
      
      <Box borderStyle="round" borderColor="#00ff00" padding={1}>
        <Text color="#00ff00">Press any key to exit</Text>
      </Box>
    </Box>
  );

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
      setProgress({ current: i, total });
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    setLoading(false);
    setCurrentScreen('success');
  };

  const screens = {
    welcome: <WelcomeScreen />,
    year: <YearInput />,
    commitMode: <CommitModeScreen />,
    commitCount: <CommitCountScreen />,
    dateRange: <DateRangeScreen />,
    confirm: <ConfirmScreen />,
    progress: <ProgressScreen />,
    success: <SuccessScreen />
  };

  return screens[currentScreen] || <WelcomeScreen />;
};

render(<GitGreenApp />);